# Scroll Distance Meter

The **Scroll Distance Meter** is a simple JavaScript bookmarklet that displays the distance scrolled on a webpage in meters. This project is designed as a bookmarklet that can be saved as a browser bookmark, allowing you to measure the scrolled distance on any page in your browser.

## Features

- Detects the device type (smartphone, tablet, desktop) and adjusts the pixel density (DPI) to calculate an approximate scrolled distance in meters.
- Displays the scrolled distance in real time in a small, styled overlay at the bottom of the screen.
- Uses a high `z-index` to ensure the overlay remains visible at all times.

## Bookmarklet Installation

1. **Copy the Code**: Copy the entire code below:

   ```javascript
   javascript:(function(){function getDeviceType(){const width=screen.width;if(width<=768){return 'phone';}else if(width<=1024){return 'tablet';}else{return 'desktop';}}function getDpiForDevice(deviceType){const dpiValues={phone:400,tablet:264,desktop:96};return dpiValues[deviceType]||96;}function calculateScrolledMeters(){const deviceType=getDeviceType();const dpi=getDpiForDevice(deviceType);const pixelToMeterFactor=0.0254/dpi;const scrolledPixels=window.scrollY;const scrolledMeters=scrolledPixels*pixelToMeterFactor;return scrolledMeters;}function createScrollMeterElement(){const scrollMeterElement=document.createElement('div');scrollMeterElement.id='scroll-meter';scrollMeterElement.style.position='fixed';scrollMeterElement.style.bottom='30px';scrollMeterElement.style.left='50%';scrollMeterElement.style.transform='translateX(-50%)';scrollMeterElement.style.padding='10px 20px';scrollMeterElement.style.backgroundColor='#000';scrollMeterElement.style.borderRadius='20px';scrollMeterElement.style.color='#fff';scrollMeterElement.style.fontFamily='Arial, Helvetica, sans-serif';scrollMeterElement.style.fontSize='1rem';scrollMeterElement.style.boxShadow='rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px';scrollMeterElement.style.zIndex='2147483647';scrollMeterElement.textContent='0.00 m';document.body.appendChild(scrollMeterElement);return scrollMeterElement;}const scrollMeterElement=createScrollMeterElement();window.addEventListener('scroll',()=>{const scrolledMeters=calculateScrolledMeters().toFixed(2);scrollMeterElement.textContent=`${scrolledMeters} m`;});})();
   ```

2.	Create a New Bookmark: Open your browser, create a new bookmark, and paste the copied code into the URL field.
3.	Name the Bookmark: Name the bookmark, e.g., “Scroll Distance Meter.”
4.	Save the Bookmark: Save it.

## Usage

1.	Open any webpage in your browser.
2.	Click on the saved “Scroll Distance Meter” bookmark.
3.	The scroll distance meter will appear at the bottom of the screen, updating in real-time as you scroll.

## How It Works

This bookmarklet follows these steps:

1.	Device Detection: The function getDeviceType determines whether the device is a smartphone, tablet, or desktop based on screen width.
2.	Setting DPI Values: Based on the device type, the function getDpiForDevice selects a typical DPI value:
    -	400 DPI for smartphones
	-	264 DPI for tablets
	-	96 DPI for desktops
3.	Calculating Scroll Distance: The calculateScrolledMeters function calculates the scrolled distance in meters based on the number of pixels scrolled and the physical size of each pixel.
4.	Creating the Scroll Meter Overlay: The createScrollMeterElement function dynamically creates the scroll-meter element, applies styling, and ensures it remains on top of the page content.
5.	Live Updates on Scroll: The overlay updates in real-time whenever you scroll, displaying the current distance in meters.

## Customization

You can adjust the following settings in the code if needed:

-	DPI Values: These can be updated in the getDpiForDevice function.
-	Overlay Style: The appearance of the overlay can be modified in createScrollMeterElement.

## License

This project is licensed under the MIT License.
