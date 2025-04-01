interface CompilerOptions {
	executorRequest: boolean;
}

interface Filters {
	execute: boolean;
}

interface ExecuteParameters {
	stdin: string;
}

interface CompilerRequest {
	compiler: string;
	options: {
		compilerOptions: CompilerOptions;
		filters: Filters;
		executeParameters?: ExecuteParameters;
	};
	lang: string;
	allowStoreCodeDebug: boolean;
	source?: string;
}

interface languageBinding {
	compilerLanguageID: string;
	aceLanguageID: string;
	compilerID: string;
}


const bindings: { [key: string]: languageBinding } = {
	python: {
		compilerLanguageID: "python",
		aceLanguageID: "python",
		compilerID: "python313"
	},
	cpp: {
		compilerLanguageID: "c++",
		aceLanguageID: "c_cpp",
		compilerID: "g82"
	}
};

let executionURL = "";
let request: CompilerRequest = {
	compiler: "",
	options: {
		compilerOptions: {
			executorRequest: true
		},
		filters: {
			execute: true
		},
	},
	lang: "",
	allowStoreCodeDebug: true
}


const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
setLanguage("python")

populateLanguageDropdown();
document.getElementById("language-dropdown")?.addEventListener("change", (event) => {
	const selectedLanguage = (event.target as HTMLSelectElement).value;
	setLanguage(selectedLanguage);
});


function setLanguage(languageKey: string): void {
	const binding = bindings[languageKey];
	if (!binding) {return;}
	
	const compilerLanguageID = binding.compilerLanguageID;
	const aceLanguageID = binding.aceLanguageID;
	const compilerID = binding.compilerID;
	
	request.lang = compilerLanguageID;
	request.compiler = compilerID;

	editor.session.setMode(`ace/mode/${aceLanguageID}`);
	executionURL = `https://godbolt.org/api/compiler/${compilerID}/compile`;
}

function populateLanguageDropdown() {
	const dropdown = document.getElementById("language-dropdown") as HTMLSelectElement;
	
	for (const key in bindings) {
		if (bindings.hasOwnProperty(key)) {
			const option = document.createElement("option");
			option.value = key;
			option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
			dropdown.appendChild(option);
		}
	}
}

async function runCode(input: string, target: HTMLElement, trimCredits: boolean): Promise<void> {
	request.source = editor.getValue();
	request.options.executeParameters = {stdin: input};
	
	target.textContent = "";
	
	fetch(executionURL, 
	{
		method: "POST",
		body: JSON.stringify(request),
		headers: {"Content-type": "application/json"},
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('idk2');
		}
		return response.text();
	})
	.then(data => {
		if (target) {
			if (trimCredits) {
				data = data.split('\n').slice(3).join('\n');
			}
			target.textContent = data;
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

async function runUserCode() {
	const executionButtons = document.getElementsByClassName('execution-request');
	for (var i = 0; i < executionButtons.length; i++) {
		(executionButtons[i] as HTMLButtonElement).disabled = true;
	}
	
	await runCode((document.getElementById('input-text') as HTMLTextAreaElement).value, document.getElementById('output'), false);
	await new Promise(resolve => setTimeout(resolve, 1500));
	for (var i = 0; i < executionButtons.length; i++) {
		(executionButtons[i] as HTMLButtonElement).disabled = false;
	}
}

async function runTests() {
	const executionButtons = document.getElementsByClassName('execution-request');
	for (var i = 0; i < executionButtons.length; i++) {
		(executionButtons[i] as HTMLButtonElement).disabled = true;
	}
	
	const testTable = document.getElementById('test-case-table') as HTMLTableElement;
	var promises = [];
	for (var i = 1, row; row = testTable.rows[i]; i++) {
		const input = row.cells[0].textContent;
		const target = row.cells[2];
		promises.push(runCode(input, target, true));
	}
	
	await Promise.allSettled(promises);
	await new Promise(resolve => setTimeout(resolve, 1500));
	for (var i = 0; i < executionButtons.length; i++) {
		(executionButtons[i] as HTMLButtonElement).disabled = false;
	}
}