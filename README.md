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
| `research.html` | Latest papers from PubMed, arXiv, *Science* and *Journal of the American Medical Association* |
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

## Accounts and login

`login.html` provides passwordless sign-in (a one-time link by email), a short non-health profile, data export and account deletion. It runs on [Supabase](https://supabase.com), which is free at this site's scale. Until it is configured the page shows a "not switched on yet" notice and the rest of the site is unaffected.

1. Create a Supabase project (choose an EU region if European readers matter). In **Authentication → URL configuration**, set the Site URL to `https://kerschberg-lgtm.github.io/AI-Advisor-for-Alzheimers/` and add `https://kerschberg-lgtm.github.io/AI-Advisor-for-Alzheimers/login.html` to the redirect URLs. In **Authentication → Providers → Email**, leave email enabled; passwords are not used.
2. In the SQL editor, run:

```sql
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  country text,
  role text,
  topics text[] default '{}',
  newsletter boolean default false,
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "own profile: read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile: insert" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile: update" on public.profiles for update using (auth.uid() = id);

create or replace function public.delete_own_account()
returns void language sql security definer set search_path = public as $$
  delete from auth.users where id = auth.uid();
$$;
revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
```

3. Copy the project URL and the **anon public** key from **Settings → API** into `config.js`. The anon key is meant to be public; the policies above are what protect the data.
4. Commit and push. Sign in once yourself to confirm the email arrives and the profile saves.

Privacy: the policy at `privacy.html` describes exactly this setup. If you add a newsletter provider, name it there before sending the first issue.
