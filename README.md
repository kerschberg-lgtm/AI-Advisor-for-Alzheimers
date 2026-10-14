# AI Advisor for Alzheimer's

A plain-language website about how artificial intelligence is being used to detect, treat, and live with Alzheimer's disease.

The site is a static page with no build step and no backend. It includes:

- **How AI helps**: four areas (earlier detection, finding treatments, daily care, research) with a maturity indicator for each.
- **Guided advisor**: a two-question flow for people worried about their memory, caregivers, clinicians, and researchers. Each path ends with what AI can do today, what it cannot, and sensible next steps. Nothing is stored or transmitted.
- **Common questions**: straight answers about AI diagnosis, blood tests, chatbots for caregiving, new drugs, and how to vet an AI health tool.
- **Trusted resources**: links to established, non-commercial organisations.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and written content |
| `styles.css` | Styling, including dark mode and reduced-motion support |
| `script.js` | Advisor logic and content, mobile navigation |

## Editing the advisor

All advisor text lives in the `CONTENT` object at the top of `script.js`. Each role has a list of `interests`, and each interest maps to a result with `can`, `cannot`, `steps`, and an optional `callout`.

## Disclaimer

This site is educational and does not provide medical advice, diagnosis, or treatment. If you or someone you know is experiencing memory changes, please speak with a licensed healthcare professional.
