# Pestoverse

![License](https://shieldsio.tougrel.dev/github/license/Tougrel/pestoverse?style=for-the-badge)
![GitHub Contributors](https://shieldsio.tougrel.dev/github/contributors/Tougrel/pestoverse?style=for-the-badge)
![GitHub Issues](https://shieldsio.tougrel.dev/github/issues/Tougrel/pestoverse?style=for-the-badge)
![GitHub pull requests](https://shieldsio.tougrel.dev/github/issues-pr/Tougrel/pestoverse?style=for-the-badge)
[![Static Badge](https://shieldsio.tougrel.dev/badge/Localization_at_Crowdin-15803d?style=for-the-badge&logo=crowdin)](https://crowdin.com/project/pestoverse)
![Static Badge](https://shieldsio.tougrel.dev/badge/Powered_by_Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)

Welcome to the **Pestoverse** github repo! The official community website built for Yuniiho's community to celebrate milestones and archive them so we can go back and watch/read them!

The website currently only has an interactive map with markers that show images of pesto plushies around the world! We are planning on adding more stuff in the future!

Credits will be given to all pesties that help (even with bug fixing and ideas)!

> This is a community project! If you want to contribute feel free to fork the repo and open a pull request.

---

## How to set up the database locally

1. Initialise the database: `pnpm migrate:local`
   This will create the database and run migrations.
2. Seed the categories table: `sqlite3 local.db < ./migrations/categories_seed.sql`
3. Seed some submissions into the database with `pnpm seed:submissions`
4. Seed some votes into the database with `pnpm seed:votes`

N.B. Steps 3 and 4 can be run multiple times and they will add new submissions and votes to the database.

## Performing D1 migrations (in beta/prod)

Migrations cannot be done via drizzle-kit directly, so we have to execute SQL scripts via wrangler

1. `npx wrangler d1 execute pestoverse --file ./migrations/[filename].sql`

## How to run the website

> Keep in mind that we deploy the website in cloudflare pages so everything we add needs to be tested there. To be sure that everything works correctly you can run the `NITRO_PRESET=cloudflare-pages pnpm build` script and it will build it with the cloudflare preset.

> If you want to expose the development version so others can see your progress without having to commit your changes so far, you can do it using [cloudflared](https://github.com/cloudflare/cloudflared) (you can find how to setup your first tunnel [here](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/))

```bash
# We are using pnpm as a package manager but you can use whatever you want
# Make sure to install the dependencies:
pnpm install

# Once you install the dependencies you can start a development server using
pnpm dev
# This will start a dev server on http://localhost:3000

# To test the application locally you can run
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

[![Image](https://i.imgur.com/gydj2I0.png)](https://pestoverse.tougrel.dev)
