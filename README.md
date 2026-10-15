# AI Advisor for Alzheimer's

An educational website on brain health, heart health, metabolism and genetics, with plain-language pages on what 23andMe can and cannot tell you about Alzheimer's risk, clinical trials in the United States and Europe, the latest research, and other trustworthy websites.

Live site: https://kerschberg-lgtm.github.io/AI-Advisor-for-Alzheimers/

The site is static HTML with no build step, no backend, and no data collection. It never accepts or analyses genetic data.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home, with the brain, DNA and heart illustration |
| `brain-health.html` | Brain health: the fourteen modifiable risk factors and the trial evidence |
| `heart-health.html` | Heart health: blood pressure, cholesterol, lipoprotein(a) and vascular dementia |
| `metabolism.html` | Brain health and metabolism: vitamin B12, folate, homocysteine, blood sugar, thyroid, GLP-1 drugs |
| `genetic-heart-health.html` | Genetics of heart and brain: APOE, familial hypercholesterolaemia, Lp(a), MTHFR |
| `23andme.html` | 23andMe's current status and the APOE ε4 report |
| `clinical-trials.html` | Recruiting and fully enrolled trials in the US and EU, with registry links |
| `research.html` | Latest papers from PubMed, arXiv, *Science* and *JAMA* |
| `other-sites.html` | Other websites that cover these topics |
| `advisor.html` | The guided advisor and common questions |

Shared files: `styles.css` (all styling, including dark mode) and `script.js` (menu toggle and advisor logic; the advisor text lives in the `CONTENT` object).

## Editing conventions

- **Update stamp.** Every page shows "Updated" with a date and time near the top. When you change a page, update its `<time>` element (both the `datetime` attribute and the visible text).
- **New material above the line.** On pages that accumulate material (trials, research), add new entries at the top under a heading such as "Added 15 October 2026", and keep the `<div class="update-divider">` with the date so older material sits below the line. Move the previous "Added" block below the divider when the next update arrives.
- **Sources.** Each topic page ends with a numbered source list linking to DOIs or official pages.
- **Shared header and footer.** Every page carries the same header and navigation markup. If you add a page, copy the header from an existing page and set `aria-current="page"` on the new item.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Disclaimer

This site is educational and does not provide medical, legal or financial advice, diagnosis, or treatment. If you or someone you know is experiencing memory changes, please speak with a licensed healthcare professional.
