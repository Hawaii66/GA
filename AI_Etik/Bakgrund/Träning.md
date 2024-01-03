# Träningsprocessen

ChatGPT är en förtränad modell som tränades i 3 distinkta steg, Generative Pre training, Supervised Fine Tuning (SFT), Reinforcement Learning Through Human Feedback (RLHF). Första steget är de steg där man ger modellen stora mängder data från olika källor och låter den bilda kopplingar. I andra steget tränade man AI för att bli bättre på konversationer, i sista steget sätts modellen i sin riktiga miljö och belönas för korrekta svar. [^5]

## Träningsdata

Träningsdata [^2] utgör den fundamentala delen för att träna AI modeller och representerar den datamängd som används för att optimera och lära modellen. Datan kan vara vad som helst, oftast är de text, bild, ljud eller andra typer av media som människor konsumerar. Träningsdatan används som underlag för modellen och dess prediktioner. När modellen systematiskt analyserar och internaliserar stora mängder data kan modellen hitta mönster och samband som människor skulle ha svårt att hitta över domäner och stora mängder data.
Träningsdatans kvalite och diversitet är avgörande faktorer för resultatet på modellens kapacitet och förståelse.
GPT-3 är tränad på ungefär 570 GB [^6] av text från internet. I texten [^1] visas en tabell över vart dessa 570 GB av data kommer. Ungefär 60% kommer från projekete CommonCrawl, 22% från WebText2, 16% från Books 1 & 2 och 3% från Wikipedia. Varför man valde dessa källor anges inte.

### CommonCrawl

CommonCrawl är den källa som används övervägande i GPT-3 träningsdata. CommonCrawl är en öppen och fri att använda dataset som innehåller text från hemsidor sedan 2008. CommonCrawl innehåller flera petabytes av data, i träningen till GPT-3 användes data mellan 2016 till 2019. Totalt motsvarade de 45 TB av komprimerad data som efter filtrering sållades ner till över 500 GB. [^4]

### WebText2

Utgående länkar från https://reddit.com har laddats ner och sparats i källan WebText2. Bara länkar med över 3 upvotes laddades ner. WebText2 utformades specifikt för GPT-2 med betoning på hög kvalitet. Detta uppnåddes genom att förlita sig på en decentraliserad användarbas där upvotes fungerade som en mätning på kvaliteten. [^3]

### Books 1 & 2

Books 1 & 2 är två book korpusar som scrapades från internet för att utvidga modellens förståelse över böcker och längre litterär text. Det är inte garanterat att all information i Books 1 & 2 har inkluderats i träningsdatan beroende på stickprov.

### Wikipedia

Den engelska versionen av Wikipedia scrapades också för att ge modellen ytterligare information.

## 3 stegs processen för att träna GPT-3.5

GPT-3.5 tränades som skrivet ovan i tre separata steg[^5].

### Generative Pre training

I första steget "stopppar man in" alla träningsdata man samlat. I GPT-3.5:s fall var detta ovanstående källor. `The transformer is in full throttle` [^5]. Efter första steget kan GPT-3.5 analysera, summera med mera men kan inte föra en konversation med människor. För att styra modellen åt en förstålig konversation används SFT och RLHF för att anpassa modellen till sitt slutliga mål.

### Supervised Fine Tuning (SFT)

Supervised Fine Tuning innebär att modellen tränas inte efter träningsdata utan efter förväntat beteenende. Datorer låtsas vara människor och pratar med modellen för att fin ändra parametrar. SFT sker i 3 steg skriver [^5]:

1. Människor låtsas vara modellen och skriver konversationer som man vill att modellen ska återskapa.
2. Konversationerna man skrivit konverteras till tokens som modellen kan förstå.
3. Algoritmen SGD används för att lära modellen hur den ska vrida parametrarna för att ge önskade resultat.

### Reinforcement Learning Through Human Feedback (RLHF)

Reinforcement Learning Through Human Feedback innvolverar människor i processen för att modellen ska fungera bra med människor i slutändan. En person för en konversation med modellen som ger flera möjliga svar på frågan, en annan person får sedan rangorda svaren. Genom att rangorda svaren kan modellen lära sig vilket sätt att svara på som är bäst. Om man använder ChatGPT och klickar på tummen upp eller ner efter ett svar är man med i denna process.

[^1]: https://arxiv.org/pdf/2005.14165.pdf
[^2]: https://en.wikipedia.org/wiki/Training,_validation,_and_test_data_sets
[^3]: https://openwebtext2.readthedocs.io/en/latest/background/
[^4]: https://commoncrawl.org/
[^5]: https://www.linkedin.com/pulse/discover-how-chatgpt-istrained-pradeep-menon/
[^6]: https://medium.com/@dlaytonj2/chatgpt-show-me-the-data-sources-11e9433d57e8
