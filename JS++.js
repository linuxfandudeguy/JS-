function showTime() {
    var selectedTimezone = "America/New_York"; // Eastern Time Zone
    var currentTime = new Date().toLocaleString("en-US", {timeZone: selectedTimezone});
    document.getElementById('currentTime').innerHTML = currentTime;
}

function openInNewWindow(url) {
    window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=800,height=600');
}

function generateRandomUnicodeString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function embedYouTubeVideo(videoCode) {
    const embedUrl = `https://www.youtube.com/embed/${videoCode}`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', true);
    document.getElementById('videoContainer').appendChild(iframe);
}

function CustomImage(imageUrl) {
    const img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    // You can add more attributes or styles to the img element if needed
    return img;
}

function CustomHTML(htmlCode) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('srcdoc', htmlCode);
    // You can add more attributes or styles to the iframe element if needed
    return iframe;
}

async function getRandomWikipediaArticle(input) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&${input ? `rnsearch=${encodeURIComponent(input)}&` : ''}origin=*`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const articleTitle = data.query.random[0].title;
        return `https://en.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`;
    } catch (error) {
        console.error('Error fetching Wikipedia article:', error);
        return null;
    }
}

async function createQRCode(input) {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input)}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to generate QR code');
        }
        return await response.blob();
    } catch (error) {
        console.error('Error generating QR code:', error);
        return null;
    }
}

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}

function openInAboutBlank(htmlContent) {
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    } else {
        console.error('Failed to open new window.');
    }
}

function encode(encodingType, text) {
    switch (encodingType.toLowerCase()) {
        case 'base64':
            return btoa(text); // Base64 encoding
        case 'url':
            return encodeURIComponent(text); // URL encoding
        // Add more cases for other encoding types as needed
        default:
            console.error('Unsupported encoding type:', encodingType);
            return null;
    }
}

async function postToHttpBin(key, value) {
    const url = 'https://httpbin.org/post';
    const data = JSON.stringify({ [key]: value });
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        return await response.json();
    } catch (error) {
        console.error('Error posting data to httpbin:', error);
        return null;
    }
}

function setCSS(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

async function fetchInfo() {
    try {
        let myIPResponse = await fetch("https://wtfismyip.com/json");
        if (!myIPResponse.ok) {
            throw new Error("Failed to fetch IP address");
        }
        let myIPData = await myIPResponse.json();
        let ipAddress = myIPData.YourFuckingIPAddress;

        let ipDataResponse = await fetch(`https://uncors.vercel.app/?url=http://ip-api.com/json/${ipAddress}`);
        if (!ipDataResponse.ok) {
            throw new Error("Failed to fetch IP data");
        }
        let ipData = await ipDataResponse.json();

        const info = {
            myIPData,
            ipData,
            userAgent: navigator.userAgent,
            connectionMethod: navigator.connection ? navigator.connection.type : 'Unknown',
            requestURL: window.location.href,
            requestPath: window.location.pathname,
            requestProtocol: window.location.protocol.replace(':', ''),
            secureConnection: window.location.protocol === 'https:' ? 'Yes' : 'No',
            proxyIPs: [],
            windowProperties: window.screen.availWidth,
            windowWidth: window.innerWidth + 'px',
            windowHeight: window.innerHeight + 'px',
            windowRatio: window.innerWidth / window.innerHeight,
            screenWidth: window.screen.width + 'px',
            screenHeight: window.screen.height + 'px',
            screenRatio: window.screen.width / window.screen.height,
            screenPixelRatio: window.devicePixelRatio,
            screenDPI: window.screen.pixelDepth,
            screenColorDepth: window.screen.colorDepth,
            screenOrientation: window.screen.orientation.type,
            screenRotation: window.screen.orientation.angle,
            os: navigator.platform,
            availableBrowserMemory: navigator.deviceMemory ? navigator.deviceMemory + 'MB' : 'Unknown',
            cpuThreads: navigator.hardwareConcurrency || 'Unknown',
            gpuVendor: navigator.gpu ? navigator.gpu.vendor : 'Unknown',
            gpuInfo: navigator.gpu ? navigator.gpu.renderer : 'Unknown',
            deviceMemory: navigator.deviceMemory || 'Unknown',
            systemLanguages: navigator.languages.join(', ')
        };

        return JSON.stringify(info);
    } catch (error) {
        console.error("Error fetching information:", error);
        return null;
    }
}
