# Hallucination

Hallucination är idag ett växande problem för AI modeller som ChatGPT. Hallucination refererar till algoritmgenererade svar med falsk eller vilseledande information [^1][^2]. Exempel är att ChatGPT ger felaktiga svar eller hittar på vad som till en början låter som möjliga svar men visar sig vara fel.

En del forskare tror att hallucination kan bero på för lite träningsdata [^1]. De menar att för lite träningsdata leder till att modellen inte kan föra ett fungerande resonemang och då måste hitta på information för att fylla i luckorna.

Google [^3] skriver att de bästa sättet att minska risken för hallucination är att:

- Minska antalet möjliga utfall, när man tränar en AI modell kan man använda `regularization` för att minska extremet osanolika utfall.
- Använd endast träningsdata som är relevant till uppgiften.
- Skapa mallar för hur modellen ska svara

[^1]: https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)
[^2]: https://www.ibm.com/topics/ai-hallucinations
[^3]: https://cloud.google.com/discover/what-are-ai-hallucinations
