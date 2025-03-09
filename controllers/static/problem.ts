interface Problem {
    title: string;
    content: string;
}

loadProblem();
fetchIDE();


async function loadProblem() {
	const urlParams = new URLSearchParams(window.location.search);
	const problemID = urlParams.get('problemID');
	
	if (problemID) {
		try {
			const response = await fetch('/problems.json');
			
			if (!response.ok) {
				throw new Error('Failed to fetch problems.json');
			}
			
			const data = await response.json();
			
			const problem: Problem = data[problemID];
			
			document.getElementById('title').innerHTML = problem.title;
			document.getElementById('content').innerHTML = problem.content;
		} catch (error) {
			console.error('Error loading data:', error);
		}
	} else {
		console.error('No problemID in the URL path');
	}
}

async function fetchIDE() {
	try {
		const response = await fetch('/IDE');
		
		if (!response.ok) {
			throw new Error('Failed to load the second HTML page');
		}
		
		const htmlContent = await response.text();
		
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlContent;
		
		const ideContent = tempDiv.querySelector('#ide');
		
		if (ideContent) {
			const ideContainer = document.getElementById('ide');
			if (ideContainer) {
				ideContainer.innerHTML = ideContent.innerHTML;
			}
		}
		loadIDEScripts();
	} catch (error) {
		console.error('Error fetching IDE content:', error);
	}
}

function loadIDEScripts() {
    const aceScript = document.createElement('script');
	const ideScript = document.createElement('script');
	
    aceScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js';
	aceScript.onload = () => {
		ideScript.src = 'IDE.js';
		ideScript.onerror = (error) => {
			console.error('Failed to load IDE.js:', error);
		};
	}
    aceScript.onerror = (error) => {
        console.error('Failed to load ace.js:', error);
    };
	
	const ide = document.getElementById('ide');
    ide.appendChild(aceScript);
	ide.appendChild(ideScript);
}