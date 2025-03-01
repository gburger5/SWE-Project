interface CompilerOptions {
	executorRequest: boolean;
}

interface Filters {
	execute: boolean;
}

interface CompilerRequest {
	compiler: string;
	options: {
		compilerOptions: CompilerOptions;
		filters: Filters;
	};
	lang: string;
	allowStoreCodeDebug: boolean;
	source?: string;
}


let executionURL = "https://godbolt.org/api/compiler/python313/compile";
let request: CompilerRequest = {
	compiler: "python313",
	options: {
		compilerOptions: {
			executorRequest: true
		},
		filters: {
			execute: true
		},
	},
	lang: "python",
	allowStoreCodeDebug: true
}

const editor = ace.edit("editor");
editor.session.setMode("ace/mode/python");
editor.setTheme("ace/theme/monokai")
// Example of how to change the language: arg1 is the language ID for the Compiler Explorer API, arg2 is language ID for the Ace API, Arg 3 is the compiler
// setLanguage("c++", "c_cpp", "g82")


function setLanguage(compilerLanguageID: string, aceLanguageID: string, compilerID: string): void {
	request.lang = compilerLanguageID;
	request.compiler = compilerID;

	editor.session.setMode(`ace/mode/${aceLanguageID}`);
	executionURL = `https://godbolt.org/api/compiler/${compilerID}/compile`;
	
	console.log(`Language set to ${compilerLanguageID}, Compiler set to ${compilerID}`);
}

function runCode(): void {
	request.source = editor.getValue();
	const outputElement = document.getElementById("output");
	outputElement.textContent = "";

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
		if (outputElement) {
			outputElement.textContent = data;
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}
