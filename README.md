# Scroll Distance Meter

The **Scroll Distance Meter** is a simple JavaScript bookmarklet that displays the distance scrolled on a webpage in **CSS meters**. This project is designed as a bookmarklet that can be saved as a browser bookmark, allowing you to measure the cumulative scroll distance on any page in your browser.

## Features

- Tracks the **cumulative scroll distance** (both up and down) in real time.
- Uses the official CSS specification conversion: `1 CSS px = 0.0254 / 96 meters`.
- Displays the distance in a small, styled overlay at the bottom of the screen.
- Overlay is non-blocking (`pointer-events: none`), auto-fades when idle, and always stays visible with a high `z-index`.
- Values are always shown with **two decimal places** (e.g. `1,40 m`).
- Efficient updates: throttled with `requestAnimationFrame` and using `passive` event listeners for smooth performance.

## Bookmarklet Installation

1. **Copy the Code**: Copy the entire code below:

   ```javascript
   javascript:(function()%7Bconst%20CSS_M_PER_PX%20%3D%200.0254%20%2F%2096%3B%20const%20nf%20%3D%20new%20Intl.NumberFormat(%22de-DE%22%2C%20%7B%20minimumFractionDigits%3A%202%2C%20maximumFractionDigits%3A%202%20%7D)%3B%20function%20createHud()%20%7B%20const%20el%20%3D%20document.createElement(%22div%22)%3B%20el.id%20%3D%20%22scroll-meter%22%3B%20Object.assign(el.style%2C%20%7B%20position%3A%20%22fixed%22%2C%20bottom%3A%20%2230px%22%2C%20left%3A%20%2250%25%22%2C%20transform%3A%20%22translateX(-50%25)%22%2C%20padding%3A%20%2210px%2020px%22%2C%20backgroundColor%3A%20%22%23000%22%2C%20borderRadius%3A%20%2220px%22%2C%20color%3A%20%22%23fff%22%2C%20fontFamily%3A%20%22Arial%2C%20Helvetica%2C%20sans-serif%22%2C%20fontSize%3A%20%221rem%22%2C%20boxShadow%3A%20%22rgba(0%2C0%2C0%2C.07)%200%201px%201px%2C%20rgba(0%2C0%2C0%2C.07)%200%202px%202px%2C%20rgba(0%2C0%2C0%2C.07)%200%204px%204px%2C%20rgba(0%2C0%2C0%2C.07)%200%208px%208px%2C%20rgba(0%2C0%2C0%2C.07)%200%2016px%2016px%22%2C%20zIndex%3A%20%222147483647%22%2C%20whiteSpace%3A%20%22nowrap%22%2C%20width%3A%20%22fit-content%22%2C%20pointerEvents%3A%20%22none%22%2C%20opacity%3A%20%220%22%2C%20transition%3A%20%22opacity%20.25s%20ease%22%20%7D)%3B%20el.textContent%20%3D%20%220%2C00%20m%22%3B%20document.body.appendChild(el)%3B%20return%20el%3B%20%7D%20const%20hud%20%3D%20createHud()%3B%20let%20lastY%20%3D%20window.scrollY%3B%20let%20totalM%20%3D%200%3B%20let%20rafPending%20%3D%20false%3B%20let%20fadeTimer%20%3D%20null%3B%20function%20render()%20%7B%20const%20val%20%3D%20totalM%3B%20hud.textContent%20%3D%20%60%24%7Bnf.format(val)%7D%20m%60%3B%20hud.style.opacity%20%3D%20%221%22%3B%20clearTimeout(fadeTimer)%3B%20fadeTimer%20%3D%20setTimeout(()%20%3D%3E%20(hud.style.opacity%20%3D%20%220.3%22)%2C%201500)%3B%20%7D%20function%20onScroll()%20%7B%20if%20(rafPending)%20return%3B%20rafPending%20%3D%20true%3B%20requestAnimationFrame(()%20%3D%3E%20%7B%20const%20y%20%3D%20window.scrollY%3B%20const%20dyPx%20%3D%20Math.abs(y%20-%20lastY)%3B%20lastY%20%3D%20y%3B%20if%20(dyPx%20%3E%200)%20%7B%20totalM%20%2B%3D%20dyPx%20*%20CSS_M_PER_PX%3B%20render()%3B%20%7D%20rafPending%20%3D%20false%3B%20%7D)%3B%20%7D%20window.addEventListener(%22scroll%22%2C%20onScroll%2C%20%7B%20passive%3A%20true%20%7D)%3B%20render()%3B%7D)()%3B
   ```

2. Create a New Bookmark: Open your browser and create a new bookmark. Paste the copied code into the URL field.
3. Name the Bookmark: Give your bookmark a name, such as “Scroll Distance Meter.”
4. Save the Bookmark.

## Usage

1. Open any webpage in your browser.
2. Click on the saved “Scroll Distance Meter” bookmark.
3. The scroll distance meter will appear at the bottom of the screen and update in real time as you scroll.

## Customization

You can adjust the following settings in the code if needed:

- **Formatting**: Change locale or number of decimals in `Intl.NumberFormat`.
- **Style**: Modify the overlay’s styles in the `Object.assign` call.
- **Fade behavior**: Adjust the idle timeout (default `1500ms`).

## License

This project is licensed under the MIT License.
