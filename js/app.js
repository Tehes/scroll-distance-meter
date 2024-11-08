function getDeviceType() {
    const width = screen.width;

    if (width <= 768) {
        return "phone";
    } else if (width <= 1024) {
        return "tablet";
    } else {
        return "desktop";
    }
}

function getDpiForDevice(deviceType) {
    const dpiValues = {
        phone: 400,    // Updated typical DPI value for smartphones
        tablet: 264,   // Updated typical DPI value for tablets
        desktop: 96    // Typical DPI value for desktop monitors
    };

    return dpiValues[deviceType] || 96;  // Fallback to 96 DPI
}

function calculateScrolledMeters() {
    const deviceType = getDeviceType();
    const dpi = getDpiForDevice(deviceType);

    // Calculate the physical size of a pixel in meters
    const pixelToMeterFactor = 0.0254 / dpi;  // 1 inch = 0.0254 meters

    // Number of scrolled CSS pixels
    const scrolledPixels = window.scrollY;

    // Calculate the scrolled distance in meters
    const scrolledMeters = scrolledPixels * pixelToMeterFactor;

    return scrolledMeters;
}

function createScrollMeterElement() {
    const scrollMeterElement = document.createElement("div");
    scrollMeterElement.id = "scroll-meter";

    // Set styles to match your provided CSS
    scrollMeterElement.style.position = "fixed";
    scrollMeterElement.style.bottom = "30px";
    scrollMeterElement.style.left = "50%";
    scrollMeterElement.style.transform = "translateX(-50%)";
    scrollMeterElement.style.padding = "10px 20px";
    scrollMeterElement.style.backgroundColor = "#000";
    scrollMeterElement.style.borderRadius = "20px";
    scrollMeterElement.style.color = "#fff";
    scrollMeterElement.style.fontFamily = "Arial, Helvetica, sans-serif";
    scrollMeterElement.style.fontSize = "1rem";
    scrollMeterElement.style.boxShadow = "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px";
    scrollMeterElement.textContent = "0.00 m";
    scrollMeterElement.style.zIndex = "2147483647";

    document.body.appendChild(scrollMeterElement);
    return scrollMeterElement;
}

const scrollMeterElement = createScrollMeterElement();

window.addEventListener("scroll", () => {
    const gescrollteMeter = calculateScrolledMeters().toFixed(2);
    scrollMeterElement.textContent = `${gescrollteMeter} m`;
});