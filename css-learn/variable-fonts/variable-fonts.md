# variable-fonts

```css
@font-face {
  font-family: 'Amstelvar VF';
  src: url('fonts/AmstelvarAlpha-VF.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 75% 100%;
  font-style: normal;
  font-display: swap;
}

html {
  box-sizing: border-box;
  font-size: 100%;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font: 1.2em "Amstelvar VF", Georgia, serif;
  margin: 20px;
  padding: 0;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

@media screen and (min-width: 42rem) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

textarea {
  font-family: monospace;
  display: block;
  margin-bottom: 10px;
  height: 160px;
  background-color: #F4F7F8;
  border: none;
  border-left: 6px solid #558ABB;
  color: #4D4E53;
  padding: 1rem 0;
  width: 100%;
}

textarea:nth-of-type(1) {
  height: 130px;
}

textarea:nth-of-type(2) {
  height: 100px;
}
```
