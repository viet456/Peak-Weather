(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();async function R(e,t){if(e===void 0||t===void 0)return console.error("Latitude and longitude are required."),null;let o=`https://api.open-meteo.com/v1/forecast?latitude=${e}&longitude=${t}&forecast_days=10&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_gusts_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max&past_days=1&timezone=auto`;try{let c=await fetch(o);if(!c.ok)throw new Error(`HTTP error! Status: ${c.status}`);let n=await c.json();return console.log(n),n}catch(c){return console.error("Failed to fetch weather data:",c),null}}const U="ccddd58ca0e545b3a0b058124c634360";async function E(e){if(!e)return null;let t=`https://api.geoapify.com/v1/geocode/search?text=${e}`;t+=`&type=city&limit=20&bias=countrycode:auto&format=json&apiKey=${U}`;try{let o=await fetch(t);if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return(await o.json()).results||[]}catch(o){return console.error("Failed to fetch locations:",o),[]}}const H=["US","CA","AU","BR","IN"];function B(e){return typeof e!="string"||e===null?"":e.toUpperCase()}function O(e){if(!e||!e.city)return"";const{city:t,state:o,country_code:c,state_code:n}=e,r=B(c);return H.includes(r)&&o?`${t}, ${o}, ${r}`:`${t}, ${r}`}function k(e){if(!e||!e.city)return"";const{city:t,state:o,country_code:c,state_code:n}=e,r=B(c);return H.includes(r)&&o?`${t}, ${n}`:`${t}, ${r}`}function S(e,t={}){const{includeMinutes:o=!0}=t,c=new Date(e);if(!c||!(c instanceof Date)||isNaN(c.getTime()))return"Invalid time";const n={hour:"numeric"};return o&&(n.minute="2-digit"),c.toLocaleTimeString([],n)}function w(e,t){if(typeof e!="number")return"";const o=t==="imperial"?"fahrenheit":"celsius";let c=e;o==="fahrenheit"&&(c=e*9/5+32);let n=navigator.language||"en-US";return new Intl.NumberFormat(n,{style:"unit",unit:o,maximumFractionDigits:"0"}).format(Math.round(c))}function I(e,t){if(typeof e!="number")return"";const o=t==="imperial"?"mile-per-hour":"kilometer-per-hour";let c=e;o==="mile-per-hour"&&(c=e*.621371);let n=navigator.language||"en-US";return new Intl.NumberFormat(n,{style:"unit",unit:o,maximumFractionDigits:"0"}).format(Math.round(c))}function W(e,t){if(typeof e!="number")return"";const o=t==="imperial"?"inch":"millimeter";let c=e;o==="inch"&&(c=e/25.4);let n=navigator.language||"en-US";return new Intl.NumberFormat(n,{style:"unit",unit:o,maximumFractionDigits:1}).format(Math.round(c))}function Y(e){let t=navigator.language||"en-US";return e.toLocaleString(t,{weekday:"short"})}const V={0:{text:"Clear Skies",icon:"sun"},1:{text:"Mainly Clear",icon:"sun"},2:{text:"Partly Cloudy",icon:"sun-cloud"},3:{text:"Overcast",icon:"cloud"},45:{text:"Foggy",icon:"fog"},48:{text:"Rime Fog",icon:"fog"},51:{text:"Light Drizzle",icon:"drizzle"},53:{text:"Drizzle",icon:"drizzle"},55:{text:"Heavy Drizzle",icon:"drizzle"},56:{text:"Light Freezing Drizzle",icon:"drizzle"},57:{text:"Freezing Drizzle",icon:"drizzle"},61:{text:"Light Rain",icon:"rain"},63:{text:"Rain",icon:"rain"},65:{text:"Heavy Rain",icon:"rain"},66:{text:"Light Freezing Rain",icon:"rain"},67:{text:"Freezing Rain",icon:"rain"},71:{text:"Light Snow",icon:"snow"},73:{text:"Snow",icon:"snow"},75:{text:"Heavy Snow",icon:"snow"},77:{text:"Snow Grains",icon:"snow"},80:{text:"Light Showers",icon:"rain"},81:{text:"Showers",icon:"rain"},82:{text:"Heavy Showers",icon:"rain"},85:{text:"Light Snow Showers",icon:"snow"},86:{text:"Heavy Snow Showers",icon:"snow"},95:{text:"Thunderstorm",icon:"thunderstorm"},96:{text:"Thunderstorm & Hail",icon:"thunderstorm"},99:{text:"Thunderstorm & Heavy Hail",icon:"thunderstorm"}};function v(e){const t=V[e];return t?t.text:"Weather data not available"}function $(e,t){if(!e)throw new Error("NO_DAILY_DATA: Daily data is missing.");if(!e.time)throw new Error("NO_TIME_ARRAY: Time array is missing in daily data.");if(!e.time[t])throw new Error(`INVALID_INDEX: No data for index ${t}.`);return{isDay:e.is_day[t],precipProbability:e.precipitation_probability[t],temperature:e.temperature_2m[t],date:new Date(e.time[t]),weatherCode:e.weather_code[t],windGusts:e.wind_gusts_10m[t],windSpeed:e.wind_speed_10m[t]}}function j(e,t){if(!e)throw new Error("NO_DAILY_DATA: Daily data is missing.");if(!e.time)throw new Error("NO_TIME_ARRAY: Time array is missing in daily data.");if(!e.time[t])throw new Error(`INVALID_INDEX: No data for index ${t}.`);return{date:new Date(e.time[t]),weatherCode:e.weather_code[t],tempMax:e.temperature_2m_max[t],tempMin:e.temperature_2m_min[t],sunrise:new Date(e.sunrise[t]),sunset:new Date(e.sunset[t]),uvIndexMax:e.uv_index_max[t],precipSum:e.precipitation_sum[t],precipProbabilityMax:e.precipitation_probability_max[t],windSpeedMax:e.wind_speed_10m_max[t],windGustsMax:e.wind_gusts_10m_max[t]}}function K(e){const t=e.current;return{time:new Date(t.time),temperature:t.temperature_2m,apparentTemperature:t.apparent_temperature,isDay:t.is_day===1,precipitation:t.precipitation,humidity:t.relative_humidity_2m,weatherCode:t.weather_code,windSpeed:t.wind_speed_10m,windGusts:t.wind_gusts_10m}}function X(e){return j(e.daily,0)}function Q(e){const t=e.daily,o=[];for(let c=0;c<t.time.length;c++){const n=j(t,c);n&&o.push(n)}return o}function Z(e){const t=e.hourly,o=[],c=new Date,n=t.time.findIndex(i=>new Date(i)>=c);if(n===-1)return[];const r=n+24;for(let i=n;i<r;i++){const s=$(t,i);s&&o.push(s)}return o}function J(e){const t=e.hourly;if(!t||!t.time)return[];const o=[],c={Morning:9,Afternoon:13,Evening:19,Overnight:22};for(const n in c){const r=c[n],i=t.time.findIndex(s=>new Date(s).getHours()===r);if(i!==-1){const s=$(t,i);s&&(s.name=n,o.push(s))}}return o}function _(e){var n;const t=e.weatherCode,o=e.isDay;let c=((n=V[t])==null?void 0:n.icon)||"unknown";return o&&((t===0||t===1)&&(c="moon"),t===2&&(c="moon-cloud")),c}const e0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.61,16.88c0-1.15,0.36-2.17,1.08-3.07c0.72-0.9,1.63-1.48,2.74-1.73c0.31-1.37,1.02-2.49,2.11-3.37s2.35-1.32,3.76-1.32
	c1.38,0,2.61,0.43,3.69,1.28s1.78,1.95,2.1,3.29h0.33c0.9,0,1.73,0.22,2.49,0.65s1.37,1.03,1.81,1.79c0.44,0.76,0.67,1.58,0.67,2.48
	c0,0.88-0.21,1.7-0.63,2.45s-1,1.35-1.73,1.8c-0.73,0.45-1.54,0.69-2.41,0.72H9.41c-1.34-0.06-2.47-0.57-3.4-1.53
	C5.08,19.37,4.61,18.22,4.61,16.88z M6.32,16.88c0,0.87,0.3,1.62,0.9,2.26s1.33,0.98,2.19,1.03h11.19c0.86-0.04,1.59-0.39,2.19-1.03
	c0.61-0.64,0.91-1.4,0.91-2.26c0-0.88-0.33-1.63-0.98-2.27c-0.65-0.64-1.42-0.96-2.32-0.96H18.8c-0.11,0-0.17-0.06-0.17-0.18
	l-0.07-0.57c-0.11-1.08-0.58-1.99-1.4-2.72c-0.82-0.73-1.77-1.1-2.86-1.1c-1.09,0-2.05,0.37-2.85,1.1
	c-0.81,0.73-1.27,1.64-1.37,2.72l-0.08,0.57c0,0.12-0.07,0.18-0.2,0.18H9.27c-0.84,0.1-1.54,0.46-2.1,1.07S6.32,16.05,6.32,16.88z"
	/>
</svg>
`,t0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.6,16.93c0-1.16,0.36-2.18,1.09-3.08c0.72-0.9,1.65-1.48,2.78-1.73c0.29-1.38,0.98-2.5,2.07-3.39S12.88,7.4,14.3,7.4
	c1.39,0,2.63,0.43,3.72,1.28c1.08,0.85,1.79,1.95,2.12,3.3h0.34c0.9,0,1.73,0.22,2.48,0.66c0.76,0.44,1.35,1.04,1.79,1.8
	c0.43,0.76,0.65,1.59,0.65,2.49c0,1.34-0.46,2.48-1.37,3.44c-0.92,0.96-2.04,1.46-3.37,1.5c-0.12,0-0.18-0.06-0.18-0.17v-1.34
	c0-0.11,0.06-0.17,0.18-0.17c0.84-0.07,1.57-0.42,2.17-1.05s0.9-1.37,0.9-2.22c0-0.89-0.32-1.66-0.96-2.31
	c-0.64-0.64-1.4-0.97-2.29-0.97h-1.63c-0.12,0-0.19-0.06-0.22-0.18l-0.07-0.57c-0.07-0.71-0.3-1.36-0.7-1.94s-0.91-1.03-1.53-1.36
	c-0.62-0.33-1.3-0.49-2.02-0.49c-1.1,0-2.05,0.36-2.86,1.09c-0.81,0.73-1.27,1.64-1.37,2.72l-0.07,0.54c0,0.09-0.05,0.14-0.16,0.14
	L9.31,13.7c-0.84,0.07-1.55,0.41-2.11,1.03c-0.57,0.62-0.85,1.35-0.85,2.2c0,0.87,0.3,1.62,0.89,2.25c0.59,0.63,1.31,0.97,2.17,1.02
	c0.12,0,0.18,0.06,0.18,0.17v1.34c0,0.11-0.06,0.17-0.18,0.17c-0.66-0.03-1.28-0.18-1.88-0.45S6.42,20.8,6,20.36
	c-0.43-0.44-0.77-0.95-1.02-1.55S4.6,17.59,4.6,16.93z M10.02,23.7c0-0.03,0.01-0.08,0.02-0.13s0.02-0.09,0.02-0.11l0.27-1.03
	c0.07-0.22,0.2-0.4,0.4-0.51c0.2-0.12,0.41-0.14,0.64-0.07c0.23,0.07,0.4,0.2,0.52,0.4c0.12,0.2,0.14,0.41,0.07,0.64l-0.24,1.01
	c-0.13,0.44-0.38,0.66-0.76,0.66c-0.03,0-0.05,0-0.09,0c-0.03,0-0.07-0.01-0.11-0.01c-0.04-0.01-0.07-0.01-0.1-0.01
	c-0.21-0.06-0.37-0.18-0.48-0.34S10.02,23.86,10.02,23.7z M11.34,18.88c0-0.02,0-0.06,0.01-0.11c0.01-0.05,0.01-0.08,0.01-0.09
	l0.3-1.05c0.06-0.19,0.17-0.34,0.32-0.45c0.15-0.1,0.31-0.15,0.47-0.15c0.02,0,0.05,0,0.08,0c0.03,0,0.06,0.01,0.09,0.01
	c0.03,0.01,0.06,0.01,0.08,0.01c0.23,0.07,0.4,0.2,0.51,0.4c0.12,0.2,0.14,0.41,0.07,0.64l-0.24,1c-0.07,0.28-0.2,0.47-0.4,0.59
	s-0.42,0.12-0.65,0.02c-0.22-0.06-0.38-0.17-0.49-0.34S11.34,19.04,11.34,18.88z M12.57,26.83c0-0.03,0.01-0.07,0.02-0.13
	s0.02-0.09,0.02-0.12l0.29-0.99c0.06-0.24,0.2-0.42,0.4-0.54c0.2-0.12,0.42-0.15,0.65-0.08c0.23,0.07,0.39,0.2,0.51,0.41
	s0.13,0.42,0.07,0.65l-0.25,1.04c-0.11,0.41-0.37,0.61-0.8,0.61c-0.05,0-0.13-0.01-0.24-0.04c-0.22-0.04-0.38-0.14-0.49-0.3
	C12.63,27.18,12.57,27.01,12.57,26.83z M13.91,22.06c0-0.06,0.01-0.14,0.04-0.25l0.27-1.03c0.07-0.23,0.2-0.4,0.41-0.51
	c0.2-0.12,0.42-0.14,0.65-0.07c0.23,0.06,0.39,0.19,0.51,0.39c0.11,0.2,0.13,0.41,0.06,0.65l-0.24,0.99
	c-0.13,0.45-0.37,0.68-0.72,0.68c-0.04,0-0.15-0.02-0.31-0.06c-0.22-0.04-0.38-0.14-0.49-0.3C13.97,22.4,13.91,22.23,13.91,22.06z
	 M16.73,23.74c0-0.07,0.01-0.15,0.03-0.24l0.28-0.99c0.07-0.24,0.2-0.42,0.41-0.54s0.41-0.15,0.63-0.09
	c0.23,0.07,0.41,0.2,0.53,0.41c0.12,0.2,0.15,0.41,0.09,0.63l-0.29,1.06c-0.1,0.41-0.36,0.61-0.79,0.61c-0.09,0-0.18-0.01-0.26-0.03
	c-0.2-0.04-0.35-0.14-0.46-0.3C16.8,24.08,16.74,23.91,16.73,23.74z M18.11,18.98c0-0.03,0.02-0.12,0.05-0.26l0.3-1.03
	c0.04-0.21,0.13-0.37,0.29-0.47c0.16-0.1,0.32-0.15,0.49-0.14c0.04-0.01,0.13,0,0.24,0.03c0.22,0.05,0.39,0.18,0.52,0.38
	c0.12,0.17,0.14,0.38,0.07,0.65l-0.24,1.03c-0.13,0.43-0.38,0.65-0.76,0.65c-0.06,0-0.17-0.02-0.34-0.06
	c-0.21-0.06-0.36-0.17-0.46-0.31C18.16,19.29,18.11,19.14,18.11,18.98z"/>
</svg>
`,n0=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve" fill="none" stroke="currentColor" stroke-width="1.5">
<path d="M9.81,15.25c0,0.92,0.23,1.78,0.7,2.57s1.1,1.43,1.9,1.9c0.8,0.47,1.66,0.71,2.59,0.71c0.93,0,1.8-0.24,2.61-0.71  c0.81-0.47,1.45-1.11,1.92-1.9c0.47-0.8,0.71-1.65,0.71-2.57c0-0.6-0.17-1.31-0.52-2.14c-0.35-0.83-0.77-1.6-1.26-2.3  c-0.44-0.57-0.96-1.2-1.56-1.88c-0.6-0.68-1.65-1.73-1.89-1.97l-1.28,1.29c-0.62,0.6-1.22,1.29-1.79,2.08  c-0.57,0.79-1.07,1.64-1.49,2.55C10.01,13.79,9.81,14.58,9.81,15.25z" fill="none" stroke="currentColor" stroke-width="1.5" />
</svg>`,c0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M9.81,15.25c0,0.92,0.23,1.78,0.7,2.57s1.1,1.43,1.9,1.9c0.8,0.47,1.66,0.71,2.59,0.71c0.93,0,1.8-0.24,2.61-0.71
	c0.81-0.47,1.45-1.11,1.92-1.9c0.47-0.8,0.71-1.65,0.71-2.57c0-0.6-0.17-1.31-0.52-2.14c-0.35-0.83-0.77-1.6-1.26-2.3
	c-0.44-0.57-0.96-1.2-1.56-1.88c-0.6-0.68-1.65-1.73-1.89-1.97l-1.28,1.29c-0.62,0.6-1.22,1.29-1.79,2.08
	c-0.57,0.79-1.07,1.64-1.49,2.55C10.01,13.79,9.81,14.58,9.81,15.25z"/>
</svg>
`,o0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M2.62,21.05c0-0.24,0.08-0.45,0.25-0.61c0.17-0.16,0.38-0.24,0.63-0.24h18.67c0.25,0,0.45,0.08,0.61,0.24
	c0.16,0.16,0.24,0.36,0.24,0.61c0,0.23-0.08,0.43-0.25,0.58c-0.17,0.16-0.37,0.23-0.6,0.23H3.5c-0.25,0-0.46-0.08-0.63-0.23
	C2.7,21.47,2.62,21.28,2.62,21.05z M5.24,17.91c0-0.24,0.09-0.44,0.26-0.6c0.15-0.15,0.35-0.23,0.59-0.23h18.67
	c0.23,0,0.42,0.08,0.58,0.24c0.16,0.16,0.23,0.35,0.23,0.59c0,0.24-0.08,0.44-0.23,0.6c-0.16,0.17-0.35,0.25-0.58,0.25H6.09
	c-0.24,0-0.44-0.08-0.6-0.25C5.32,18.34,5.24,18.14,5.24,17.91z M5.37,15.52c0,0.09,0.05,0.13,0.15,0.13h1.43
	c0.06,0,0.13-0.05,0.2-0.16c0.24-0.52,0.59-0.94,1.06-1.27c0.47-0.33,0.99-0.52,1.55-0.56l0.55-0.07c0.11,0,0.17-0.06,0.17-0.18
	l0.07-0.5c0.11-1.08,0.56-1.98,1.37-2.7c0.81-0.72,1.76-1.08,2.85-1.08c1.08,0,2.02,0.36,2.83,1.07c0.8,0.71,1.26,1.61,1.37,2.68
	l0.08,0.57c0,0.11,0.07,0.17,0.2,0.17h1.59c0.64,0,1.23,0.17,1.76,0.52s0.92,0.8,1.18,1.37c0.07,0.11,0.14,0.16,0.21,0.16h1.43
	c0.12,0,0.17-0.07,0.14-0.23c-0.29-1.02-0.88-1.86-1.74-2.51c-0.87-0.65-1.86-0.97-2.97-0.97h-0.32c-0.33-1.33-1.03-2.42-2.1-3.27
	s-2.28-1.27-3.65-1.27c-1.4,0-2.64,0.44-3.73,1.32s-1.78,2-2.09,3.36c-0.85,0.2-1.6,0.6-2.24,1.21c-0.64,0.61-1.09,1.33-1.34,2.18
	v-0.04C5.37,15.45,5.37,15.48,5.37,15.52z M6.98,24.11c0-0.24,0.09-0.43,0.26-0.59c0.15-0.15,0.35-0.23,0.6-0.23h18.68
	c0.24,0,0.44,0.08,0.6,0.23c0.17,0.16,0.25,0.35,0.25,0.58c0,0.24-0.08,0.44-0.25,0.61c-0.17,0.17-0.37,0.25-0.6,0.25H7.84
	c-0.23,0-0.43-0.09-0.6-0.26C7.07,24.55,6.98,24.34,6.98,24.11z"/>
</svg>
`,r0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.14,16.9c0-1.16,0.35-2.18,1.06-3.08s1.62-1.47,2.74-1.72c0.23-1.03,0.7-1.93,1.4-2.7c0.7-0.77,1.55-1.32,2.53-1.65
	c0.62-0.21,1.26-0.32,1.93-0.32c0.81,0,1.6,0.16,2.35,0.48c0.28-0.47,0.61-0.88,0.99-1.22c0.38-0.34,0.77-0.61,1.17-0.79
	c0.4-0.18,0.8-0.32,1.18-0.41s0.76-0.13,1.12-0.13c0.38,0,0.79,0.05,1.23,0.16l0.82,0.25c0.14,0.06,0.18,0.13,0.14,0.22l-0.14,0.6
	c-0.07,0.31-0.1,0.6-0.1,0.86c0,0.31,0.05,0.63,0.15,0.95c0.1,0.32,0.24,0.63,0.44,0.94c0.19,0.31,0.46,0.58,0.8,0.83
	c0.34,0.25,0.72,0.44,1.15,0.57l0.62,0.22c0.1,0.03,0.15,0.08,0.15,0.16c0,0.02-0.01,0.04-0.02,0.07l-0.18,0.67
	c-0.27,1.08-0.78,1.93-1.5,2.57c0.4,0.7,0.62,1.45,0.65,2.24c0.01,0.05,0.01,0.12,0.01,0.23c0,0.89-0.22,1.72-0.67,2.48
	c-0.44,0.76-1.05,1.36-1.8,1.8c-0.76,0.44-1.59,0.67-2.48,0.67H9.07c-0.89,0-1.72-0.22-2.48-0.67s-1.35-1.05-1.79-1.8
	S4.14,17.8,4.14,16.9z M5.85,16.9c0,0.89,0.32,1.66,0.96,2.31c0.64,0.65,1.39,0.98,2.26,0.98h10.81c0.89,0,1.65-0.32,2.28-0.97
	s0.95-1.42,0.95-2.32c0-0.88-0.32-1.63-0.96-2.26c-0.64-0.63-1.4-0.95-2.28-0.95h-1.78l-0.1-0.75c-0.1-1.01-0.52-1.88-1.26-2.59
	s-1.62-1.11-2.63-1.2c-0.03,0-0.08,0-0.15-0.01c-0.07-0.01-0.11-0.01-0.15-0.01c-0.51,0-1.02,0.1-1.54,0.29V9.4
	c-0.73,0.28-1.35,0.74-1.84,1.37c-0.5,0.63-0.8,1.35-0.9,2.17l-0.07,0.72l-0.68,0.03c-0.84,0.1-1.54,0.45-2.1,1.06
	S5.85,16.07,5.85,16.9z M17.6,8.79c1.06,0.91,1.72,1.97,1.97,3.18h0.32c1.24,0,2.3,0.39,3.17,1.18c0.33-0.31,0.58-0.67,0.76-1.07
	c-0.91-0.43-1.63-1.09-2.16-1.97c-0.52-0.88-0.79-1.81-0.79-2.78V7.09c-0.05-0.01-0.13-0.01-0.24-0.01
	c-0.58-0.01-1.15,0.13-1.7,0.44C18.38,7.82,17.93,8.24,17.6,8.79z"/>
</svg>
`,i0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M7.91,14.48c0-0.96,0.19-1.87,0.56-2.75s0.88-1.63,1.51-2.26c0.63-0.63,1.39-1.14,2.27-1.52c0.88-0.38,1.8-0.57,2.75-0.57
	h1.14c0.16,0.04,0.23,0.14,0.23,0.28l0.05,0.88c0.04,1.27,0.49,2.35,1.37,3.24c0.88,0.89,1.94,1.37,3.19,1.42l0.82,0.07
	c0.16,0,0.24,0.08,0.24,0.23v0.98c0.01,1.28-0.3,2.47-0.93,3.56c-0.63,1.09-1.48,1.95-2.57,2.59c-1.08,0.63-2.27,0.95-3.55,0.95
	c-0.97,0-1.9-0.19-2.78-0.56s-1.63-0.88-2.26-1.51c-0.63-0.63-1.13-1.39-1.5-2.26C8.1,16.37,7.91,15.45,7.91,14.48z M9.74,14.48
	c0,0.76,0.15,1.48,0.45,2.16c0.3,0.67,0.7,1.24,1.19,1.7c0.49,0.46,1.05,0.82,1.69,1.08c0.63,0.27,1.28,0.4,1.94,0.4
	c0.58,0,1.17-0.11,1.76-0.34c0.59-0.23,1.14-0.55,1.65-0.96c0.51-0.41,0.94-0.93,1.31-1.57c0.37-0.64,0.6-1.33,0.71-2.09
	c-1.63-0.34-2.94-1.04-3.92-2.1s-1.55-2.3-1.7-3.74C13.86,9.08,13,9.37,12.21,9.9c-0.78,0.53-1.39,1.2-1.82,2.02
	C9.96,12.74,9.74,13.59,9.74,14.48z"/>
</svg>
`,s0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.64,16.91c0-1.15,0.36-2.17,1.08-3.07c0.72-0.9,1.63-1.47,2.73-1.73c0.31-1.36,1.02-2.48,2.11-3.36s2.34-1.31,3.75-1.31
	c1.38,0,2.6,0.43,3.68,1.28c1.08,0.85,1.78,1.95,2.1,3.29h0.32c0.89,0,1.72,0.22,2.48,0.65s1.37,1.03,1.81,1.78
	c0.44,0.75,0.67,1.58,0.67,2.47c0,0.88-0.21,1.69-0.63,2.44c-0.42,0.75-1,1.35-1.73,1.8c-0.73,0.45-1.53,0.69-2.4,0.71
	c-0.13,0-0.2-0.06-0.2-0.17v-1.33c0-0.12,0.07-0.18,0.2-0.18c0.85-0.04,1.58-0.38,2.18-1.02s0.9-1.39,0.9-2.26s-0.33-1.62-0.98-2.26
	s-1.42-0.96-2.31-0.96h-1.61c-0.12,0-0.18-0.06-0.18-0.17l-0.08-0.58c-0.11-1.08-0.58-1.99-1.39-2.71
	c-0.82-0.73-1.76-1.09-2.85-1.09c-1.09,0-2.05,0.36-2.85,1.09c-0.81,0.73-1.26,1.63-1.36,2.71l-0.07,0.53c0,0.12-0.07,0.19-0.2,0.19
	l-0.53,0.03c-0.83,0.1-1.53,0.46-2.1,1.07s-0.85,1.33-0.85,2.16c0,0.87,0.3,1.62,0.9,2.26s1.33,0.98,2.18,1.02
	c0.11,0,0.17,0.06,0.17,0.18v1.33c0,0.11-0.06,0.17-0.17,0.17c-1.34-0.06-2.47-0.57-3.4-1.53S4.64,18.24,4.64,16.91z M9.99,23.6
	c0-0.04,0.01-0.11,0.04-0.2l1.63-5.77c0.06-0.19,0.17-0.34,0.32-0.44c0.15-0.1,0.31-0.15,0.46-0.15c0.07,0,0.15,0.01,0.24,0.03
	c0.24,0.04,0.42,0.17,0.54,0.37c0.12,0.2,0.15,0.42,0.08,0.67l-1.63,5.73c-0.12,0.43-0.4,0.64-0.82,0.64
	c-0.04,0-0.07-0.01-0.11-0.02c-0.06-0.02-0.09-0.03-0.1-0.03c-0.22-0.06-0.38-0.17-0.49-0.33C10.04,23.93,9.99,23.77,9.99,23.6z
	 M12.61,26.41l2.44-8.77c0.04-0.19,0.14-0.34,0.3-0.44c0.16-0.1,0.32-0.15,0.49-0.15c0.09,0,0.18,0.01,0.27,0.03
	c0.22,0.06,0.38,0.19,0.49,0.39c0.11,0.2,0.13,0.41,0.07,0.64l-2.43,8.78c-0.04,0.17-0.13,0.31-0.29,0.43
	c-0.16,0.12-0.32,0.18-0.51,0.18c-0.09,0-0.18-0.02-0.25-0.05c-0.2-0.05-0.37-0.18-0.52-0.39C12.56,26.88,12.54,26.67,12.61,26.41z
	 M16.74,23.62c0-0.04,0.01-0.11,0.04-0.23l1.63-5.77c0.06-0.19,0.16-0.34,0.3-0.44c0.15-0.1,0.3-0.15,0.46-0.15
	c0.08,0,0.17,0.01,0.26,0.03c0.21,0.06,0.36,0.16,0.46,0.31c0.1,0.15,0.15,0.31,0.15,0.47c0,0.03-0.01,0.08-0.02,0.14
	s-0.02,0.1-0.02,0.12l-1.63,5.73c-0.04,0.19-0.13,0.35-0.28,0.46s-0.32,0.17-0.51,0.17l-0.24-0.05c-0.2-0.06-0.35-0.16-0.46-0.32
	C16.79,23.94,16.74,23.78,16.74,23.62z"/>
</svg>
`,a0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.64,16.95c0-1.16,0.35-2.18,1.06-3.08s1.62-1.48,2.74-1.76c0.31-1.36,1.01-2.48,2.1-3.36s2.34-1.31,3.75-1.31
	c1.38,0,2.6,0.43,3.68,1.28c1.08,0.85,1.78,1.95,2.1,3.29h0.32c0.89,0,1.72,0.22,2.48,0.66c0.76,0.44,1.37,1.04,1.81,1.8
	c0.44,0.76,0.67,1.59,0.67,2.48c0,1.32-0.46,2.47-1.39,3.42c-0.92,0.96-2.05,1.46-3.38,1.5c-0.13,0-0.2-0.06-0.2-0.17v-1.33
	c0-0.12,0.07-0.18,0.2-0.18c0.85-0.04,1.58-0.38,2.18-1.02s0.9-1.38,0.9-2.23c0-0.89-0.32-1.65-0.97-2.3s-1.42-0.97-2.32-0.97h-1.61
	c-0.12,0-0.18-0.06-0.18-0.17l-0.08-0.58c-0.11-1.08-0.58-1.99-1.39-2.72c-0.82-0.73-1.76-1.1-2.85-1.1c-1.1,0-2.05,0.37-2.86,1.11
	c-0.81,0.74-1.27,1.65-1.37,2.75l-0.06,0.5c0,0.12-0.07,0.19-0.2,0.19l-0.53,0.07c-0.83,0.07-1.53,0.41-2.1,1.04
	s-0.85,1.35-0.85,2.19c0,0.85,0.3,1.59,0.9,2.23s1.33,0.97,2.18,1.02c0.11,0,0.17,0.06,0.17,0.18v1.33c0,0.11-0.06,0.17-0.17,0.17
	c-1.34-0.04-2.47-0.54-3.4-1.5C5.1,19.42,4.64,18.27,4.64,16.95z M10.14,24.65c0-0.23,0.08-0.43,0.25-0.6
	c0.16-0.15,0.35-0.23,0.57-0.23c0.23,0,0.43,0.08,0.59,0.23s0.24,0.35,0.24,0.59c0,0.24-0.08,0.43-0.24,0.59
	c-0.16,0.16-0.35,0.23-0.59,0.23c-0.23,0-0.43-0.08-0.59-0.23C10.22,25.08,10.14,24.88,10.14,24.65z M11,21.02
	c0-0.22,0.08-0.42,0.24-0.58c0.16-0.16,0.35-0.24,0.59-0.24c0.23,0,0.43,0.08,0.59,0.24c0.16,0.16,0.24,0.36,0.24,0.58
	c0,0.24-0.08,0.44-0.24,0.6c-0.16,0.17-0.35,0.25-0.59,0.25c-0.23,0-0.43-0.08-0.59-0.25C11.08,21.46,11,21.26,11,21.02z
	 M12.9,26.61c0-0.23,0.08-0.43,0.25-0.61c0.16-0.16,0.35-0.24,0.57-0.24c0.24,0,0.44,0.08,0.61,0.25c0.17,0.17,0.25,0.37,0.25,0.6
	s-0.08,0.43-0.25,0.59c-0.17,0.16-0.37,0.24-0.61,0.24c-0.23,0-0.42-0.08-0.58-0.24C12.99,27.03,12.9,26.84,12.9,26.61z
	 M13.77,22.95c0-0.24,0.08-0.44,0.24-0.62c0.16-0.16,0.36-0.24,0.58-0.24c0.23,0,0.43,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.61
	c0,0.23-0.08,0.43-0.25,0.6s-0.37,0.25-0.6,0.25c-0.23,0-0.42-0.08-0.58-0.25C13.85,23.38,13.77,23.18,13.77,22.95z M14.19,19.33
	c0-0.23,0.08-0.43,0.25-0.6c0.18-0.16,0.37-0.24,0.57-0.24c0.24,0,0.44,0.08,0.61,0.25c0.17,0.17,0.25,0.36,0.25,0.6
	c0,0.23-0.08,0.43-0.25,0.59c-0.17,0.16-0.37,0.24-0.61,0.24c-0.23,0-0.42-0.08-0.58-0.24C14.27,19.76,14.19,19.56,14.19,19.33z
	 M16.56,24.65c0-0.23,0.08-0.43,0.24-0.6c0.16-0.15,0.36-0.23,0.6-0.23c0.24,0,0.43,0.08,0.59,0.23c0.16,0.16,0.23,0.35,0.23,0.59
	c0,0.24-0.08,0.43-0.23,0.59c-0.16,0.16-0.35,0.23-0.59,0.23c-0.24,0-0.44-0.08-0.6-0.24C16.64,25.07,16.56,24.88,16.56,24.65z
	 M17.41,21.02c0-0.22,0.08-0.41,0.25-0.58c0.17-0.17,0.37-0.25,0.6-0.25c0.23,0,0.43,0.08,0.59,0.24c0.16,0.16,0.24,0.36,0.24,0.58
	c0,0.24-0.08,0.44-0.24,0.6c-0.16,0.17-0.35,0.25-0.59,0.25c-0.24,0-0.44-0.08-0.6-0.25C17.5,21.45,17.41,21.25,17.41,21.02z"/>
</svg>
`,l0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M1.56,16.9c0,0.9,0.22,1.73,0.66,2.49s1.04,1.36,1.8,1.8c0.76,0.44,1.58,0.66,2.47,0.66h10.83c0.89,0,1.72-0.22,2.48-0.66
	c0.76-0.44,1.37-1.04,1.81-1.8c0.44-0.76,0.67-1.59,0.67-2.49c0-0.66-0.14-1.33-0.42-2C22.62,13.98,23,12.87,23,11.6
	c0-0.71-0.14-1.39-0.41-2.04c-0.27-0.65-0.65-1.2-1.12-1.67C21,7.42,20.45,7.04,19.8,6.77c-0.65-0.28-1.33-0.41-2.04-0.41
	c-1.48,0-2.77,0.58-3.88,1.74c-0.77-0.44-1.67-0.66-2.7-0.66c-1.41,0-2.65,0.44-3.73,1.31c-1.08,0.87-1.78,1.99-2.08,3.35
	c-1.12,0.26-2.03,0.83-2.74,1.73S1.56,15.75,1.56,16.9z M3.27,16.9c0-0.84,0.28-1.56,0.84-2.17c0.56-0.61,1.26-0.96,2.1-1.06
	l0.5-0.03c0.12,0,0.19-0.06,0.19-0.18l0.07-0.54c0.14-1.08,0.61-1.99,1.41-2.71c0.8-0.73,1.74-1.09,2.81-1.09
	c1.1,0,2.06,0.37,2.87,1.1c0.82,0.73,1.27,1.63,1.37,2.71l0.07,0.58c0.02,0.11,0.09,0.17,0.21,0.17h1.61c0.88,0,1.64,0.32,2.28,0.96
	c0.64,0.64,0.96,1.39,0.96,2.27c0,0.91-0.32,1.68-0.95,2.32c-0.63,0.64-1.4,0.96-2.28,0.96H6.49c-0.88,0-1.63-0.32-2.27-0.97
	C3.59,18.57,3.27,17.8,3.27,16.9z M9.97,4.63c0,0.24,0.08,0.45,0.24,0.63l0.66,0.64c0.25,0.19,0.46,0.27,0.64,0.25
	c0.21,0,0.39-0.09,0.55-0.26s0.24-0.38,0.24-0.62c0-0.24-0.09-0.44-0.26-0.59l-0.59-0.66c-0.18-0.16-0.38-0.24-0.61-0.24
	c-0.24,0-0.45,0.08-0.62,0.25C10.05,4.19,9.97,4.39,9.97,4.63z M15.31,9.06c0.69-0.67,1.51-1,2.45-1c0.99,0,1.83,0.34,2.52,1.03
	c0.69,0.69,1.04,1.52,1.04,2.51c0,0.62-0.17,1.24-0.51,1.84C19.84,12.48,18.68,12,17.32,12H17C16.75,10.91,16.19,9.93,15.31,9.06z
	 M16.94,3.78c0,0.26,0.08,0.46,0.23,0.62s0.35,0.23,0.59,0.23c0.26,0,0.46-0.08,0.62-0.23c0.16-0.16,0.23-0.36,0.23-0.62V1.73
	c0-0.24-0.08-0.43-0.24-0.59s-0.36-0.23-0.61-0.23c-0.24,0-0.43,0.08-0.59,0.23s-0.23,0.35-0.23,0.59V3.78z M22.46,6.07
	c0,0.26,0.07,0.46,0.22,0.62c0.21,0.16,0.42,0.24,0.62,0.24c0.18,0,0.38-0.08,0.59-0.24l1.43-1.43c0.16-0.18,0.24-0.39,0.24-0.64
	c0-0.24-0.08-0.44-0.24-0.6c-0.16-0.16-0.36-0.24-0.59-0.24c-0.24,0-0.43,0.08-0.58,0.24l-1.47,1.43
	C22.53,5.64,22.46,5.84,22.46,6.07z M23.25,17.91c0,0.24,0.08,0.45,0.25,0.63l0.65,0.63c0.15,0.16,0.34,0.24,0.58,0.24
	s0.44-0.08,0.6-0.25c0.16-0.17,0.24-0.37,0.24-0.62c0-0.22-0.08-0.42-0.24-0.58l-0.65-0.65c-0.16-0.16-0.35-0.24-0.57-0.24
	c-0.24,0-0.44,0.08-0.6,0.24C23.34,17.47,23.25,17.67,23.25,17.91z M24.72,11.6c0,0.23,0.09,0.42,0.26,0.58
	c0.16,0.16,0.37,0.24,0.61,0.24h2.04c0.23,0,0.42-0.08,0.58-0.23s0.23-0.35,0.23-0.59c0-0.24-0.08-0.44-0.23-0.6
	s-0.35-0.25-0.58-0.25h-2.04c-0.24,0-0.44,0.08-0.61,0.25C24.8,11.17,24.72,11.37,24.72,11.6z"/>
</svg>
`,u0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.37,14.62c0-0.24,0.08-0.45,0.25-0.62c0.17-0.16,0.38-0.24,0.6-0.24h2.04c0.23,0,0.42,0.08,0.58,0.25
	c0.15,0.17,0.23,0.37,0.23,0.61S8,15.06,7.85,15.23c-0.15,0.17-0.35,0.25-0.58,0.25H5.23c-0.23,0-0.43-0.08-0.6-0.25
	C4.46,15.06,4.37,14.86,4.37,14.62z M7.23,21.55c0-0.23,0.08-0.43,0.23-0.61l1.47-1.43c0.15-0.16,0.35-0.23,0.59-0.23
	c0.24,0,0.44,0.08,0.6,0.23s0.24,0.34,0.24,0.57c0,0.24-0.08,0.46-0.24,0.64L8.7,22.14c-0.41,0.32-0.82,0.32-1.23,0
	C7.31,21.98,7.23,21.78,7.23,21.55z M7.23,7.71c0-0.23,0.08-0.43,0.23-0.61C7.66,6.93,7.87,6.85,8.1,6.85
	c0.22,0,0.42,0.08,0.59,0.24l1.43,1.47c0.16,0.15,0.24,0.35,0.24,0.59c0,0.24-0.08,0.44-0.24,0.6s-0.36,0.24-0.6,0.24
	c-0.24,0-0.44-0.08-0.59-0.24L7.47,8.32C7.31,8.16,7.23,7.95,7.23,7.71z M9.78,14.62c0-0.93,0.23-1.8,0.7-2.6s1.1-1.44,1.91-1.91
	s1.67-0.7,2.6-0.7c0.7,0,1.37,0.14,2.02,0.42c0.64,0.28,1.2,0.65,1.66,1.12c0.47,0.47,0.84,1.02,1.11,1.66
	c0.27,0.64,0.41,1.32,0.41,2.02c0,0.94-0.23,1.81-0.7,2.61c-0.47,0.8-1.1,1.43-1.9,1.9c-0.8,0.47-1.67,0.7-2.61,0.7
	s-1.81-0.23-2.61-0.7c-0.8-0.47-1.43-1.1-1.9-1.9C10.02,16.43,9.78,15.56,9.78,14.62z M11.48,14.62c0,0.98,0.34,1.81,1.03,2.5
	c0.68,0.69,1.51,1.04,2.49,1.04s1.81-0.35,2.5-1.04s1.04-1.52,1.04-2.5c0-0.96-0.35-1.78-1.04-2.47c-0.69-0.68-1.52-1.02-2.5-1.02
	c-0.97,0-1.8,0.34-2.48,1.02C11.82,12.84,11.48,13.66,11.48,14.62z M14.14,22.4c0-0.24,0.08-0.44,0.25-0.6s0.37-0.24,0.6-0.24
	c0.24,0,0.45,0.08,0.61,0.24s0.24,0.36,0.24,0.6v1.99c0,0.24-0.08,0.45-0.25,0.62c-0.17,0.17-0.37,0.25-0.6,0.25
	s-0.44-0.08-0.6-0.25c-0.17-0.17-0.25-0.38-0.25-0.62V22.4z M14.14,6.9V4.86c0-0.23,0.08-0.43,0.25-0.6C14.56,4.09,14.76,4,15,4
	s0.43,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.6V6.9c0,0.23-0.08,0.42-0.25,0.58S15.23,7.71,15,7.71s-0.44-0.08-0.6-0.23
	S14.14,7.13,14.14,6.9z M19.66,20.08c0-0.23,0.08-0.42,0.23-0.56c0.15-0.16,0.34-0.23,0.56-0.23c0.24,0,0.44,0.08,0.6,0.23
	l1.46,1.43c0.16,0.17,0.24,0.38,0.24,0.61c0,0.23-0.08,0.43-0.24,0.59c-0.4,0.31-0.8,0.31-1.2,0l-1.42-1.42
	C19.74,20.55,19.66,20.34,19.66,20.08z M19.66,9.16c0-0.25,0.08-0.45,0.23-0.59l1.42-1.47c0.17-0.16,0.37-0.24,0.59-0.24
	c0.24,0,0.44,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.6c0,0.25-0.08,0.46-0.24,0.62l-1.46,1.43c-0.18,0.16-0.38,0.24-0.6,0.24
	c-0.23,0-0.41-0.08-0.56-0.24S19.66,9.4,19.66,9.16z M21.92,14.62c0-0.24,0.08-0.44,0.24-0.62c0.16-0.16,0.35-0.24,0.57-0.24h2.02
	c0.23,0,0.43,0.09,0.6,0.26c0.17,0.17,0.26,0.37,0.26,0.6s-0.09,0.43-0.26,0.6c-0.17,0.17-0.37,0.25-0.6,0.25h-2.02
	c-0.23,0-0.43-0.08-0.58-0.25S21.92,14.86,21.92,14.62z"/>
</svg>
`,p0=`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve">
<path d="M4.63,16.91c0,1.11,0.33,2.1,0.99,2.97s1.52,1.47,2.58,1.79l-0.66,1.68c-0.03,0.14,0.02,0.22,0.14,0.22h2.13l-0.98,4.3h0.28
	l3.92-5.75c0.04-0.04,0.04-0.09,0.01-0.14c-0.03-0.05-0.08-0.07-0.15-0.07h-2.18l2.48-4.64c0.07-0.14,0.02-0.22-0.14-0.22h-2.94
	c-0.09,0-0.17,0.05-0.23,0.15l-1.07,2.87c-0.71-0.18-1.3-0.57-1.77-1.16c-0.47-0.59-0.7-1.26-0.7-2.01c0-0.83,0.28-1.55,0.85-2.17
	c0.57-0.61,1.27-0.97,2.1-1.07l0.53-0.07c0.13,0,0.2-0.06,0.2-0.18l0.07-0.51c0.11-1.08,0.56-1.99,1.37-2.72
	c0.81-0.73,1.76-1.1,2.85-1.1c1.09,0,2.04,0.37,2.85,1.1c0.82,0.73,1.28,1.64,1.4,2.72l0.07,0.58c0,0.11,0.06,0.17,0.18,0.17h1.6
	c0.91,0,1.68,0.32,2.32,0.95c0.64,0.63,0.97,1.4,0.97,2.28c0,0.85-0.3,1.59-0.89,2.21c-0.59,0.62-1.33,0.97-2.2,1.04
	c-0.13,0-0.2,0.06-0.2,0.18v1.37c0,0.11,0.07,0.17,0.2,0.17c1.33-0.04,2.46-0.55,3.39-1.51s1.39-2.11,1.39-3.45
	c0-0.9-0.22-1.73-0.67-2.49c-0.44-0.76-1.05-1.36-1.81-1.8c-0.77-0.44-1.6-0.66-2.5-0.66H20.1c-0.33-1.33-1.04-2.42-2.11-3.26
	s-2.3-1.27-3.68-1.27c-1.41,0-2.67,0.44-3.76,1.31s-1.79,1.99-2.1,3.36c-1.11,0.26-2.02,0.83-2.74,1.73S4.63,15.76,4.63,16.91z
	 M12.77,26.62c0,0.39,0.19,0.65,0.58,0.77c0.01,0,0.05,0,0.11,0.01c0.06,0.01,0.11,0.01,0.14,0.01c0.17,0,0.33-0.05,0.49-0.15
	c0.16-0.1,0.27-0.26,0.32-0.48l2.25-8.69c0.06-0.24,0.04-0.45-0.07-0.65c-0.11-0.19-0.27-0.32-0.5-0.39
	c-0.17-0.02-0.26-0.03-0.26-0.03c-0.16,0-0.32,0.05-0.47,0.15c-0.15,0.1-0.26,0.25-0.31,0.45l-2.26,8.72
	C12.78,26.44,12.77,26.53,12.77,26.62z M16.93,23.56c0,0.13,0.03,0.26,0.1,0.38c0.14,0.22,0.31,0.37,0.51,0.44
	c0.11,0.03,0.21,0.05,0.3,0.05s0.2-0.02,0.32-0.08c0.21-0.09,0.35-0.28,0.42-0.57l1.44-5.67c0.03-0.14,0.05-0.23,0.05-0.27
	c0-0.15-0.05-0.3-0.16-0.45s-0.26-0.26-0.46-0.32c-0.17-0.02-0.26-0.03-0.26-0.03c-0.17,0-0.33,0.05-0.47,0.15
	c-0.14,0.1-0.24,0.25-0.3,0.45l-1.46,5.7c0,0.02,0,0.05-0.01,0.11C16.93,23.5,16.93,23.53,16.93,23.56z"/>
</svg>
`,z=Object.assign({"../assets/icons/weather/cloud.svg":e0,"../assets/icons/weather/drizzle.svg":t0,"../assets/icons/weather/droplet-empty.svg":n0,"../assets/icons/weather/droplet-filled.svg":c0,"../assets/icons/weather/fog.svg":o0,"../assets/icons/weather/moon-cloud.svg":r0,"../assets/icons/weather/moon.svg":i0,"../assets/icons/weather/rain.svg":s0,"../assets/icons/weather/snow.svg":a0,"../assets/icons/weather/sun-cloud.svg":l0,"../assets/icons/weather/sun.svg":u0,"../assets/icons/weather/thunderstorm.svg":p0}),q={};for(const e in z){const t=e.split("/").pop().replace(".svg","");q[t]=z[e]}function m(e){return q[e]||""}function d0(e,t,o){const n=document.getElementById("current-weather-template").content.cloneNode(!0),r={location:n.querySelector(".js-current-location"),time:n.querySelector(".js-current-time"),temp:n.querySelector(".js-current-temp"),icon:n.querySelector(".js-current-icon"),text:n.querySelector(".js-current-text")},i=k(t),s=S(e.time),a=w(e.temperature,o),u=v(e.weatherCode),l=_(e),g=m(l);r.location.textContent=`${i}`,r.time.textContent=`As of ${s}`,r.temp.textContent=`${a}`,r.icon.innerHTML=g,r.text.textContent=u;const y=document.getElementById("current-weather-container");y.innerHTML="",y.append(n)}function m0(){const e=navigator.language||"en-US";let t;try{t=new Intl.Locale(e).region}catch{t="US"}return["US","BS","BZ","KY","LR","PW","FM","MH"].includes(t)?"imperial":"metric"}function C(){return localStorage.getItem("systemUnit")||m0()}function T(e){localStorage.setItem("systemUnit",e)}function g0(){const e=C();T(e==="metric"?"imperial":"metric")}function w0(e,t,o){const n=document.getElementById("today-details-template").content.cloneNode(!0),r={title:n.querySelector(".js-today-title"),forecast:n.querySelector(".js-today-forecast-text"),forecastIcon:n.querySelector(".js-today-forecast-icon"),highLow:n.querySelector(".js-today-high-low"),wind:n.querySelector(".js-today-wind"),sunrise:n.querySelector(".js-today-sunrise"),sunset:n.querySelector(".js-today-sunset"),precipProbability:n.querySelector(".js-today-precip-probability"),precipSum:n.querySelector(".js-today-precip-sum"),uvIndex:n.querySelector(".js-today-uv-index")},i=v(e.weatherCode),s=_(e),a=m(s),u=w(e.tempMax,o),l=w(e.tempMin,o),g=I(e.windSpeedMax,o),y=I(e.windGustsMax,o),h=S(e.sunrise),x=S(e.sunset),P=e.precipProbabilityMax,A=W(e.precipSum,o),F=e.uvIndexMax;r.title.textContent=`Weather Today in ${k(t)}`,r.forecast.innerHTML=`${i}`,r.forecastIcon.innerHTML=`${a}`,r.highLow.textContent=`${u} / ${l}`,r.wind.textContent=`${g} with gusts of ${y}`,r.sunrise.textContent=`${h}`,r.sunset.textContent=`${x}`,r.precipProbability.textContent=`${P}%`,r.precipSum.textContent=`${A}`,r.uvIndex.textContent=`${F}`;const L=document.getElementById("today-details-container");L.innerHTML="",L.append(n)}function y0(e,t){const c=document.getElementById("daily-item-template").content.cloneNode(!0),n={day:c.querySelector(".js-daily-day"),icon:c.querySelector(".js-daily-icon"),text:c.querySelector(".js-daily-forecast"),high:c.querySelector(".js-daily-high"),low:c.querySelector(".js-daily-low"),precipIcon:c.querySelector(".js-daily-precip-icon"),precipText:c.querySelector(".js-daily-precip-text")},r=new Date,i=e.date;let s;r.getFullYear()===i.getFullYear()&&r.getMonth()===i.getMonth()&&r.getDate()===i.getDate()?s="Today":s=Y(i);const a=w(e.tempMax,t),u=w(e.tempMin,t),l=v(e.weatherCode),g=_(e),y=m(g),h=e.precipProbabilityMax;let x="";return h>=0&&(x=m("droplet-empty"),h>=30&&(x=m("droplet-filled"))),n.day.innerHTML=`${s}`,n.icon.innerHTML=`${y}`,n.text.textContent=l,n.high.textContent=a,n.low.textContent=u,n.precipIcon.innerHTML=`${x}`,n.precipText.textContent=`${h}%`,c}function h0(e,t,o){const n=document.getElementById("daily-forecast-template").content.cloneNode(!0),r=n.querySelector(".daily-forecast__items-container"),i=new Date,s=new Date(i.getFullYear(),i.getMonth(),i.getDate());e.forEach(u=>{if(u.date>=s){const l=y0(u,o);r.append(l)}});const a=document.getElementById("daily-forecast-container");a.innerHTML="",a.append(n)}function x0(e,t){const c=document.getElementById("hourly-item-template").content.cloneNode(!0),n={time:c.querySelector(".js-hourly-time"),temp:c.querySelector(".js-hourly-temp"),icon:c.querySelector(".js-hourly-icon"),text:c.querySelector(".js-hourly-description"),precipIcon:c.querySelector(".js-hourly-precip-icon"),precipText:c.querySelector(".js-hourly-precip-text")},r=S(e.date,{includeMinutes:!1}),i=w(e.temperature,t);v(e.weatherCode);const s=_(e),a=m(s),u=e.precipProbability;let l="";return u>=0&&(l=m("droplet-empty"),u>=30&&(l=m("droplet-filled"))),n.time.textContent=r,n.icon.innerHTML=`${a}`,n.temp.textContent=i,n.precipIcon.innerHTML=`${l}`,n.precipText.textContent=`${u}%`,c}function f0(e,t,o){const n=document.getElementById("hourly-forecast-template").content.cloneNode(!0),r=n.querySelector(".hourly-forecast__items-container");e.forEach(s=>{const a=x0(s,o);r.append(a)});const i=document.getElementById("hourly-forecast-container");i.innerHTML="",i.append(n)}function v0(e,t){const c=document.getElementById("period-item-template").content.cloneNode(!0),n={name:c.querySelector(".js-period-name"),temp:c.querySelector(".js-period-temp"),text:c.querySelector(".js-period-description"),icon:c.querySelector(".js-period-icon"),precipIcon:c.querySelector(".js-period-precip-icon"),precipText:c.querySelector(".js-period-precip-text")},r=e.name,i=w(e.temperature,t),s=v(e.weatherCode),a=_(e),u=m(a),l=e.precipProbability;let g="";return l>=0&&(g=m("droplet-empty"),l>=30&&(g=m("droplet-filled"))),n.name.textContent=r,n.temp.textContent=i,n.text.textContent=s,n.icon.innerHTML=`${u}`,n.precipIcon.innerHTML=`${g}`,n.precipText.textContent=`${l}%`,c}function _0(e,t,o){const n=document.getElementById("periods-forecast-template").content.cloneNode(!0),r=n.querySelector(".periods-forecast__list");e.forEach(s=>{const a=v0(s,o);r.append(a)});const i=document.getElementById("periods-forecast-container");i.innerHTML="",i.append(n)}const d=document.getElementById("search-results"),p=document.getElementById("search-input");document.getElementById("weather-container");const f=document.getElementById("unit-toggle-btn");let M=null,G=null;async function N(e){if(!e)return null;if(d.innerHTML="",d.classList.remove("hidden"),e.length===0&&p.value!==""){d.innerHTML='<div class="location-result-item">No results found</div>';return}e.forEach(t=>{if(!t||!t.city)return;const o=document.createElement("div");o.classList.add("location-result-item"),o.textContent=O(t),o.addEventListener("mousedown",async()=>{b(t)}),d.append(o)})}async function S0(e){if(!e||e.length<2)return d.classList.add("hidden"),d.innerHTML="",p.classList.remove("is-showing-results"),[];const t=await E(e);return p.classList.add("is-showing-results"),N(t),console.log("API Search Results:",t),t}async function b(e){M=e,p.value="",p.blur(),p.classList.remove("is-showing-results"),d.innerHTML="",d.classList.add("hidden");const t=await R(e.lat,e.lon);G=t,D(t,e)}function D(e,t){let o=C();const c=K(e),n=X(e),r=Q(e),i=Z(e),s=J(e);d0(c,t,o),w0(n,t,o),_0(s,t,o),f0(i,t,o),h0(r,t,o)}function C0(){C()==="metric"?f.textContent="C":f.textContent="F"}function M0(){C0(),f.addEventListener("click",()=>{g0(),C()==="metric"?f.textContent="C":f.textContent="F",M&&D(G,M)});let e,t=[],o="";p.addEventListener("input",n=>{clearTimeout(e);const r=n.target.value.trim();e=setTimeout(async()=>{if(r.length<2){d.classList.add("hidden");return}const i=await E(r);o=r,t=i||[],N(t)},200)}),p.addEventListener("keydown",async n=>{if(n.key==="Enter"){n.preventDefault(),clearTimeout(e),d.classList.add("hidden");const r=n.target.value.trim();if(!r)return;let i=t;if(r!=o&&(i=await S0(r),o=r,t=i),i&&i.length>0){const s=i[0];b(s)}else console.log("No results found for:",r)}}),p.addEventListener("blur",()=>{p.classList.remove("is-showing-results"),d.classList.add("hidden")}),p.addEventListener("focus",()=>{p.value.length>2&&(p.classList.add("is-showing-results"),d.classList.remove("hidden"))}),b({city:"San Francisco",state_code:"CA",country:"United States",country_code:"us",lat:37.7749,lon:-122.4194})}M0();
