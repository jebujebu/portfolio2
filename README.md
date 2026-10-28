# Portfolio

Tumma, responsiivinen React-portfolio ja CV. Sivun tekstit ja esimerkkisisältö
ovat kuvitteellisia; korvaa ne omillasi ennen julkaisua.

## Käynnistä paikallisesti

1. Asenna [Node.js LTS](https://nodejs.org/), joka asentaa myös npm:n.
2. Avaa projektin kansio terminaalissa ja asenna riippuvuudet:

   ```bash
   npm install
   ```

3. Käynnistä Vite-kehityspalvelin:

   ```bash
   npm run dev
   ```

4. Luo julkaisuversio komennolla `npm run build`. Valmis sivusto tulee
   `dist`-kansioon.

## Julkaise GitHub Pagesissa

1. Lisää projektin tiedostot GitHub-repositorioon, jonka oletushaara on `main`.
2. Avaa repositoriossa **Settings → Pages** ja valitse **Build and deployment →
   Source: GitHub Actions**.
3. Pushaa muutokset `main`-haaraan. Tiedosto
   `.github/workflows/deploy.yml` asentaa paketit, rakentaa sivuston ja julkaisee
   sen automaattisesti GitHub Pagesiin.

## Muokkaa sisältöä

Kaikki sivulla näytettävät tekstit ja sisältötiedot ovat tiedostossa
`src/content.json`. Muokkaa siellä nimeä, sähköpostia, esittelyä, työkokemusta,
osaamista, koulutusta, käyttöliittymän tekstejä sekä galleriaprojekteja. Sivu ja
selaimen otsikko käyttävät samoja JSON-tietoja. Säilytä JSONin lainausmerkit ja
pilkut.

Galleriaprojektit ovat `gallery.projects`-listassa. Voit lisätä, poistaa tai
muokata projekteja. Lisää kuva tai video täyttämällä projektin `media`, esim.:

```json
"media": "/media/oma-kuva.jpg"
```

Tallenna tiedosto `public/media`-kansioon. Videoprojektin `type` on `"video"` ja
kuvaprojektin `"image"`. Projektin `shape` (`"portrait"`, `"landscape"` tai
`"square"`) ja `art`-luokka valitsevat kortin muodon ja paikkamerkin tyylin.
Kuvien ja videoiden polut osoittavat `public`-kansion sisällä olevaan
tiedostoon.

Valaistus- ja mallinnuskuvat voit lisätä suoraan kansioihin
`public/pics/valaistus` ja `public/pics/mallinnus`. Galleria lukee kansioiden
kuvat automaattisesti ja sijoittaa ne vastaavaan osioon. Tuetut tiedostomuodot
ovat JPG, JPEG, PNG, WebP, GIF ja AVIF. Lisää kuvatiedostot ennen
julkaisuversiota, jotta ne sisältyvät buildiin.
