//
//  webpack.config.js
//  Configuration file for webpack dependency for the Viridian Project
//
//  Created by Darius Miclaus (mdarius13)
//
//  Copyright (c) 2022 Miclaus Industries Corporation B.V. Advanced Software Technologies Research Group.
//
//  Permission is hereby granted, free of charge, 
//  to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation the rights to use, copy, 
//  modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
//  persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall 
//  be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
//  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
//  ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
//  OR OTHER DEALINGS IN THE SOFTWARE.
//

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

// Main Webpack configuration
module.exports = {
	// Viridian library entry point. Should point to the compiled .ts -> .js file
	/* You can also add more entry points by doing something like:
    entry: {
        foo: "foo.js",
        bar: "bar.js"
    }*/
	entry: "./Source/index.ts",

	// Viridian Module Configuration
	module: {
		// Module Rules
		rules: [
			// TypeScript Rule
			{
				// Test
				test: /\.ts(x)?$/,
				
				// Use TS-Loader
				use: "ts-loader",
				
				// Exclude `node_modules`
				exclude: /node_modules/,
			},
			// Babel Rule
			{
				// Test
				test: /\.js(x)?$/,

				// Use Babel loader
				use: "babel-loader",

				// Exclude `node_modules`
				exclude: /node_modules/
			},
		],
	},

	// File Resolver
	resolve: {
		// compile files containing .tsx, .ts or .js
		extensions: [".tsx", ".ts", ".js"],
	},

	// The name of the file we want to 'compile' our compiled .js file to.
	output: {
		// Will be output to "Viridian/Release/dist/x.xx"
		path: path.resolve(__dirname, "Release/dist"),

		// And the master output file will be called `libViridian.js`
		filename: "libViridian.js",

		// Outputs a library exposing entry point.
		library: "Viridian"
	},

	// Set webpack to the Production environment.
	mode: "production",
};

