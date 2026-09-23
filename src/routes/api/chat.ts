import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway.server";
import { createOpenAI } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `Você é o assistente da MYSTRATS, agência de criação de sites. Quando o usuário descrever um projeto, estime o valor entre R$ 1.500 e R$ 15.000, dependendo da complexidade, e o prazo entre 1 e 6 semanas. Explique brevemente os fatores considerados e pergunte se a pessoa deseja ser contactada pelo WhatsApp. Seja direto, amigável e use linguagem brasileira informal. Não prometa preço final: deixe claro que é uma estimativa inicial.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Envie uma descrição válida do projeto.", { status: 400 });
        }
        const key = process.env['LOVABLE_API_KEY'];
        if (!key) return new Response("O assistente está temporariamente indisponível.", { status: 500 });

        const initialRunId = getLovableAiGatewayRunId(request);
        const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        const result = streamText({
          model: lovable.responses("openai/gpt-6-astra"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(body.messages as UIMessage[]),
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });
        const response = result.toUIMessageStreamResponse({
          originalMessages: body.messages as UIMessage[],
          headers: getLovableAiGatewayResponseHeaders(
            initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : undefined,
          ),
        });
        return withLovableAiGatewayRunIdHeader(response, runIdFetch);
      },
    },
  },
});