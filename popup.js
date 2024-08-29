// popup.js

// Save data to chrome.storage.local
document.getElementById('saveStorage').addEventListener('click', () => {
    const inputValue = document.getElementById('storageInput').value;
    
    chrome.storage.local.set({ storedData: inputValue }, () => {
        console.log('Data saved to storage.');
    });
});

// Read data from chrome.storage.local
document.getElementById('readStorage').addEventListener('click', () => {
    chrome.storage.local.get(['storedData'], (result) => {
        document.getElementById('storageOutput').textContent = 'Stored Value: ' + result.storedData;
    });
});

// Download a file with predefined content
document.getElementById('downloadFile').addEventListener('click', () => {
    const dataToSave = 'This is the content of the downloaded file.';
    const blob = new Blob([dataToSave], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
        url: url,
        filename: 'downloaded_file.txt',
        saveAs: true
    }, (downloadId) => {
        console.log('Download started with ID:', downloadId);
    });
});

// Read file selected by the user
document.getElementById('readFile').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('fileOutput').textContent = 'File Content: ' + e.target.result;
    };

    if (file) {
        reader.readAsText(file);
    } else {
        document.getElementById('fileOutput').textContent = 'No file selected';
    }
});
