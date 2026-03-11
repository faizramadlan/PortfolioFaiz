export interface CheatsheetCard {
  id: string;
  tab: string;
  keywords: string;
  number: string;
  title: string;
  tags: string[];
  codeHtml: string;
  explanationsHtml: string;
  exercise: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  };
}

export const CHEATSHEET_DATA: CheatsheetCard[] = [
  {
    "id": "card-1",
    "tab": "js",
    "keywords": "variables let const var types string number boolean null undefined typeof bigint symbol",
    "number": "00000001",
    "title": "VARIABLES & TYPES",
    "tags": [
      "BASICS",
      "TYPES"
    ],
    "codeHtml": "<span class=\"kw\">let</span>   x <span class=\"op\">=</span> <span class=\"nm\">10</span>;          <span class=\"xm\">// reassignable</span>\n<span class=\"kw\">const</span> y <span class=\"op\">=</span> <span class=\"nm\">20</span>;          <span class=\"xm\">// constant — prefer this</span>\n<span class=\"xm\">// var z;               ← avoid! (function-scoped)</span>\n\n<span class=\"kw\">let</span> name  <span class=\"op\">=</span> <span class=\"str\">'Alice'</span>;    <span class=\"xm\">// string</span>\n<span class=\"kw\">let</span> age   <span class=\"op\">=</span> <span class=\"nm\">25</span>;         <span class=\"xm\">// number (int+float same type)</span>\n<span class=\"kw\">let</span> ok    <span class=\"op\">=</span> <span class=\"kw\">true</span>;       <span class=\"xm\">// boolean</span>\n<span class=\"kw\">let</span> empty <span class=\"op\">=</span> <span class=\"kw\">null</span>;       <span class=\"xm\">// intentionally empty</span>\n<span class=\"kw\">let</span> undef;              <span class=\"xm\">// undefined (never assigned)</span>\n<span class=\"kw\">let</span> big   <span class=\"op\">=</span> <span class=\"nm\">9007n</span>;      <span class=\"xm\">// BigInt</span>\n<span class=\"kw\">let</span> sym   <span class=\"op\">=</span> <span class=\"fn\">Symbol</span>(<span class=\"str\">'id'</span>); <span class=\"xm\">// unique</span>\n\n<span class=\"kw\">typeof</span> <span class=\"str\">'hi'</span>    <span class=\"xm\">// 'string'</span>\n<span class=\"kw\">typeof</span> <span class=\"nm\">42</span>     <span class=\"xm\">// 'number'</span>\n<span class=\"kw\">typeof</span> <span class=\"kw\">null</span>   <span class=\"xm\">// 'object'  ← historic JS bug!</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is a variable?</div><div class=\"et\"><div class=\"analogy\"><strong>📦 A variable is a labelled box.</strong> You put a value inside and give the box a name so you can find it later. <code>let age = 25</code> means \"create a box called <em>age</em> and put 25 inside it.\" Anywhere you write <code>age</code> later in the code, JS opens that box and uses what's inside.</div></div></div>\n<div class=\"es\"><div class=\"el\">const vs let vs var</div><div class=\"et\"><strong>Use <code>const</code> by default</strong> — it seals the box. Anyone reading your code knows the value won't be replaced.<br><br>Use <code>let</code> only when you genuinely need to reassign — loop counters, accumulating totals, state toggles.<br><br><div class=\"gotcha\"><strong>⚠ Never use var.</strong> It was the original keyword before 2015. It ignores block scope — a variable declared inside an <code>if</code> with <code>var</code> leaks outside the curly braces, causing subtle bugs. Just forget it exists.</div></div></div>\n<div class=\"es\"><div class=\"el\">the 7 primitive types</div><div class=\"et\"><ul><li><code>string</code> — text in quotes. Backtick strings let you embed expressions: <code>`Hello ${name}`</code></li><li><code>number</code> — any number. JS doesn't separate integers from decimals — both are just <em>number</em></li><li><code>boolean</code> — only <code>true</code> or <code>false</code>. Like a light switch</li><li><code>null</code> — intentionally empty. \"This box is empty on purpose\"</li><li><code>undefined</code> — JS assigned this automatically; you never gave it a value</li><li><code>Symbol</code> — guaranteed-unique identifier. Rare in everyday code</li><li><code>BigInt</code> — numbers too large for regular <code>number</code>. Add <code>n</code> suffix: <code>9007n</code></li></ul><div class=\"gotcha\"><strong>⚠ typeof null === 'object'</strong> — This is a famous bug from 1995 that was never fixed because it would break millions of existing websites. Just memorise this quirk.</div></div></div>",
    "exercise": {
      "question": "Which keyword should be your default choice for declaring variables?",
      "options": [
        "let",
        "var",
        "const",
        "def"
      ],
      "correctAnswerIndex": 2
    }
  },
  {
    "id": "card-2",
    "tab": "js",
    "keywords": "functions arrow default rest params return hoisting template literal expression",
    "number": "00000010",
    "title": "FUNCTIONS",
    "tags": [
      "BASICS",
      "ARROW",
      "REST"
    ],
    "codeHtml": "<span class=\"kw\">function</span> <span class=\"fn\">greet</span>(name) {\n  <span class=\"kw\">return</span> <span class=\"str\">`Hello ${name}`</span>;\n}\n\n<span class=\"xm\">// Arrow — shorter, inherits outer `this`</span>\n<span class=\"kw\">const</span> <span class=\"fn\">add</span>    <span class=\"op\">=</span> (a, b) <span class=\"op\">=&gt;</span> a <span class=\"op\">+</span> b;\n<span class=\"kw\">const</span> <span class=\"fn\">square</span> <span class=\"op\">=</span> n <span class=\"op\">=&gt;</span> n <span class=\"op\">*</span> n;\n<span class=\"kw\">const</span> <span class=\"fn\">hi</span>     <span class=\"op\">=</span> () <span class=\"op\">=&gt;</span> <span class=\"str\">'hi'</span>;\n\n<span class=\"xm\">// Default parameter</span>\n<span class=\"kw\">const</span> <span class=\"fn\">welcome</span> <span class=\"op\">=</span> (name <span class=\"op\">=</span> <span class=\"str\">'World'</span>) <span class=\"op\">=&gt;</span>\n  <span class=\"str\">`Welcome, ${name}`</span>;\n\n<span class=\"xm\">// Rest — collects remaining args into array</span>\n<span class=\"kw\">const</span> <span class=\"fn\">sum</span> <span class=\"op\">=</span> (<span class=\"op\">...</span>nums) <span class=\"op\">=&gt;</span>\n  nums.<span class=\"fn\">reduce</span>((a, b) <span class=\"op\">=&gt;</span> a <span class=\"op\">+</span> b, <span class=\"nm\">0</span>);\n<span class=\"fn\">sum</span>(<span class=\"nm\">1</span>, <span class=\"nm\">2</span>, <span class=\"nm\">3</span>); <span class=\"xm\">// → 6</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is a function?</div><div class=\"et\"><div class=\"analogy\"><strong>🏭 A function is a reusable recipe.</strong> You write the steps once, name them, then \"call\" (run) the recipe as many times as you want with different ingredients (inputs). <code>greet(\"Alice\")</code> runs the greet recipe with Alice, handing back \"Hello Alice!\"</div>The values you pass when calling are <strong>arguments</strong>. The names in the definition are <strong>parameters</strong>. <code>return</code> is the output — what the function hands back.</div></div>\n<div class=\"es\"><div class=\"el\">declaration vs arrow</div><div class=\"et\"><strong>Declarations</strong> are hoisted — JS moves them to the top before running, so you can call them before you wrote them. Occasionally handy.<br><br><strong>Arrow functions</strong> are the modern choice. Two key differences:<ul><li>Shorter — great for one-liners</li><li>No own <code>this</code> — they inherit it from the enclosing scope, making them safe in class callbacks</li></ul><div class=\"tip\"><strong>💡</strong> Use arrow functions for almost everything. Use declarations for top-level named functions only.</div></div></div>\n<div class=\"es\"><div class=\"el\">template literals</div><div class=\"et\">Backtick strings with <code>${}</code> are <strong>template literals</strong>. The <code>${}</code> slot accepts any JavaScript expression — variable, math, ternary, function call. Vastly cleaner than string concatenation: <code>`Hello ${name}!`</code> vs <code>\"Hello \" + name + \"!\"</code>.</div></div>\n<div class=\"es\"><div class=\"el\">default &amp; rest parameters</div><div class=\"et\"><strong>Default:</strong> <code>name = \"World\"</code> provides a fallback when the caller passes nothing (or passes <code>undefined</code>).<br><br><strong>Rest (<code>...nums</code>):</strong> collects all remaining arguments into a real array. Useful when you don't know in advance how many values someone will pass.</div></div>",
    "exercise": {
      "question": "How do arrow functions handle the `this` keyword differently than function declarations?",
      "options": [
        "They create their own `this` context binding.",
        "They throw an error if `this` is used.",
        "They inherit `this` from the enclosing scope.",
        "They bind `this` to the global window object."
      ],
      "correctAnswerIndex": 2
    }
  },
  {
    "id": "card-3",
    "tab": "js",
    "keywords": "arrays map filter reduce find findIndex includes slice sort push pop splice forEach some every flat",
    "number": "00000011",
    "title": "ARRAYS",
    "tags": [
      "MAP",
      "FILTER",
      "REDUCE"
    ],
    "codeHtml": "<span class=\"kw\">const</span> arr <span class=\"op\">=</span> [<span class=\"nm\">1</span>, <span class=\"nm\">2</span>, <span class=\"nm\">3</span>, <span class=\"nm\">4</span>];\n\n<span class=\"xm\">// Mutating (changes original):</span>\narr.<span class=\"fn\">push</span>(<span class=\"nm\">5</span>)         <span class=\"xm\">// add end → [1,2,3,4,5]</span>\narr.<span class=\"fn\">pop</span>()          <span class=\"xm\">// remove last</span>\narr.<span class=\"fn\">unshift</span>(<span class=\"nm\">0</span>)      <span class=\"xm\">// add front</span>\narr.<span class=\"fn\">splice</span>(<span class=\"nm\">1</span>,<span class=\"nm\">1</span>)    <span class=\"xm\">// remove 1 item at index 1</span>\narr.<span class=\"fn\">sort</span>((a,b)<span class=\"op\">=&gt;</span>a<span class=\"op\">-</span>b) <span class=\"xm\">// numeric sort — always pass fn!</span>\n\n<span class=\"xm\">// Non-mutating (returns new array):</span>\narr.<span class=\"fn\">map</span>(x <span class=\"op\">=&gt;</span> x <span class=\"op\">*</span> <span class=\"nm\">2</span>)      <span class=\"xm\">// [2,4,6,8]</span>\narr.<span class=\"fn\">filter</span>(x <span class=\"op\">=&gt;</span> x <span class=\"op\">&gt;</span> <span class=\"nm\">2</span>)    <span class=\"xm\">// [3,4]</span>\narr.<span class=\"fn\">slice</span>(<span class=\"nm\">1</span>, <span class=\"nm\">3</span>)          <span class=\"xm\">// [2,3]</span>\n\n<span class=\"xm\">// Returns a single value:</span>\narr.<span class=\"fn\">reduce</span>((acc,x)<span class=\"op\">=&gt;</span>acc<span class=\"op\">+</span>x, <span class=\"nm\">0</span>) <span class=\"xm\">// 10</span>\narr.<span class=\"fn\">find</span>(x <span class=\"op\">=&gt;</span> x <span class=\"op\">&gt;</span> <span class=\"nm\">2</span>)          <span class=\"xm\">// 3</span>\narr.<span class=\"fn\">includes</span>(<span class=\"nm\">2</span>)               <span class=\"xm\">// true</span>\narr.<span class=\"fn\">some</span>(x <span class=\"op\">=&gt;</span> x <span class=\"op\">&gt;</span> <span class=\"nm\">3</span>)          <span class=\"xm\">// true</span>\narr.<span class=\"fn\">every</span>(x <span class=\"op\">=&gt;</span> x <span class=\"op\">&gt;</span> <span class=\"nm\">0</span>)          <span class=\"xm\">// true</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is an array?</div><div class=\"et\"><div class=\"analogy\"><strong>📋 An array is an ordered, numbered list.</strong> Index 0 = item #1, index 1 = item #2. <code>arr[0]</code> = first item. Arrays can hold anything — numbers, strings, objects, even other arrays — all mixed together.</div></div></div>\n<div class=\"es\"><div class=\"el\">the big three: map, filter, reduce</div><div class=\"et\"><strong><code>map()</code></strong> — Transform every item and get a new list. Like saying \"for each item, apply this recipe.\" The original is untouched, the result has the same length.<br><br><strong><code>filter()</code></strong> — Keep only items where your test function returns <code>true</code>. Like crossing out things that don't qualify. Result may be shorter.<br><br><strong><code>reduce()</code></strong> — Collapse all items into one value. Add up numbers, build an object from an array. The second argument is the starting value (use <code>0</code> for sums).<br><br><div class=\"tip\"><strong>💡</strong> All three never mutate the original — they return new arrays. Chain them: <code>arr.filter(x =&gt; x &gt; 0).map(x =&gt; x * 2)</code></div></div></div>\n<div class=\"es\"><div class=\"el\">the sort() gotcha</div><div class=\"et\"><div class=\"gotcha\"><strong>⚠ sort() without a comparator is alphabetical — even for numbers!</strong> <code>[10, 2, 30].sort()</code> gives <code>[10, 2, 30]</code> because \"1\" comes before \"2\" alphabetically. Always pass <code>(a, b) =&gt; a - b</code> for ascending numeric sort. Forgetting this is a rite of passage.</div></div></div>\n<div class=\"es\"><div class=\"el\">quick reference</div><div class=\"et\"><ul><li><code>find(fn)</code> — first matching item (or <code>undefined</code>)</li><li><code>findIndex(fn)</code> — index of first match (or <code>-1</code>)</li><li><code>includes(x)</code> — does x exist? → boolean</li><li><code>some(fn)</code> — at least one match?</li><li><code>every(fn)</code> — all items match?</li><li><code>flat()</code> — flatten one level of nesting</li><li><code>slice(1, 3)</code> — copy from index 1 up to (not including) 3</li></ul></div></div>",
    "exercise": {
      "question": "Which array method should you use if you want to apply a function to every item and get a NEW array of the same length back?",
      "options": [
        "forEach()",
        "reduce()",
        "filter()",
        "map()"
      ],
      "correctAnswerIndex": 3
    }
  },
  {
    "id": "card-4",
    "tab": "js",
    "keywords": "objects destructuring spread entries keys values shorthand computed property assign nested",
    "number": "00000100",
    "title": "OBJECTS & DESTRUCTURING",
    "tags": [
      "OBJECTS",
      "SPREAD",
      "DESTRUCT"
    ],
    "codeHtml": "<span class=\"kw\">const</span> user <span class=\"op\">=</span> { name: <span class=\"str\">'Alice'</span>, age: <span class=\"nm\">25</span> };\n\nuser.name;        <span class=\"xm\">// dot access</span>\nuser[<span class=\"str\">'age'</span>];     <span class=\"xm\">// bracket (dynamic key)</span>\n\n<span class=\"xm\">// Destructuring — unpack multiple at once</span>\n<span class=\"kw\">const</span> { name, age } <span class=\"op\">=</span> user;\n<span class=\"kw\">const</span> { name: n, age <span class=\"op\">=</span> <span class=\"nm\">18</span> } <span class=\"op\">=</span> user;\n<span class=\"xm\">//              ↑ rename   ↑ default</span>\n\n<span class=\"xm\">// Spread — copy + override (immutable update)</span>\n<span class=\"kw\">const</span> updated <span class=\"op\">=</span> { <span class=\"op\">...</span>user, age: <span class=\"nm\">26</span> };\n\n<span class=\"xm\">// Shorthand — when key = variable name</span>\n<span class=\"kw\">const</span> city <span class=\"op\">=</span> <span class=\"str\">'Jakarta'</span>;\n<span class=\"kw\">const</span> obj <span class=\"op\">=</span> { name, city }; <span class=\"xm\">// same as name:name</span>\n\nObject.<span class=\"fn\">keys</span>(user)    <span class=\"xm\">// ['name','age']</span>\nObject.<span class=\"fn\">values</span>(user)  <span class=\"xm\">// ['Alice',25]</span>\nObject.<span class=\"fn\">entries</span>(user) <span class=\"xm\">// [['name','Alice'],['age',25]]</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is an object?</div><div class=\"et\"><div class=\"analogy\"><strong>🗂️ An object is a form with labelled fields.</strong> An ID card has fields: name, age, role. An object is exactly that — a collection of named values. Each name is a \"key,\" its content is a \"value.\" While arrays use numbers as index (<code>arr[0]</code>), objects use string names (<code>user.name</code>).</div>Use dot notation when the key name is known ahead of time. Use bracket notation <code>user[\"age\"]</code> when the key is stored in a variable.</div></div>\n<div class=\"es\"><div class=\"el\">destructuring — the time-saver</div><div class=\"et\">Without destructuring:<br><code>const name = user.name;</code><br><code>const age = user.age;</code><br><br>With destructuring (one line):<br><code>const { name, age } = user;</code><br><br><strong>Rename:</strong> <code>{ name: n }</code> = \"pull out <code>name</code>, call it <code>n</code> locally.\"<br><strong>Default:</strong> <code>{ age = 18 }</code> = \"use 18 if the field doesn't exist or is <code>undefined</code>.\"<br><br>Works on arrays too: <code>const [a, b, ...rest] = [1, 2, 3, 4];</code></div></div>\n<div class=\"es\"><div class=\"el\">spread — the copy machine</div><div class=\"et\"><code>{ ...user, age: 26 }</code> = \"copy everything from user, then override age with 26.\" Creates a brand new object — the original is untouched.<br><br>This pattern is everywhere in React for immutable state updates: <code>{ ...oldState, loading: false }</code><br><br><div class=\"gotcha\"><strong>⚠ Spread is shallow!</strong> Nested objects are copied by reference, not cloned. If <code>user.address</code> is an object, both the copy and original share the same address object. Change one, you change both.</div></div></div>\n<div class=\"es\"><div class=\"el\">Object utilities</div><div class=\"et\"><code>Object.keys()</code>, <code>Object.values()</code>, and <code>Object.entries()</code> let you loop over objects. They convert an object's parts into arrays, which you can then chain with <code>.map()</code>, <code>.filter()</code>, etc. <code>entries()</code> is especially powerful — it gives you <code>[key, value]</code> pairs perfect for rebuilding a modified object.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-5",
    "tab": "js",
    "keywords": "async await promise fetch then catch finally parallel all allSettled race any",
    "number": "00000101",
    "title": "ASYNC / AWAIT & PROMISES",
    "tags": [
      "ASYNC",
      "PROMISES",
      "FETCH"
    ],
    "codeHtml": "<span class=\"kw\">async function</span> <span class=\"fn\">getUser</span>(id) {\n  <span class=\"kw\">try</span> {\n    <span class=\"kw\">const</span> res <span class=\"op\">=</span> <span class=\"kw\">await</span> <span class=\"fn\">fetch</span>(<span class=\"str\">`/api/users/${id}`</span>);\n    <span class=\"kw\">if</span> (!res.ok) <span class=\"kw\">throw new</span> <span class=\"fn\">Error</span>(res.status);\n    <span class=\"kw\">return await</span> res.<span class=\"fn\">json</span>();\n  } <span class=\"kw\">catch</span> (err) {\n    console.<span class=\"fn\">error</span>(<span class=\"str\">'Failed:'</span>, err);\n  }\n}\n\n<span class=\"xm\">// Parallel requests — much faster!</span>\n<span class=\"kw\">const</span> [users, posts] <span class=\"op\">=</span> <span class=\"kw\">await</span> Promise.<span class=\"fn\">all</span>([\n  <span class=\"fn\">fetch</span>(<span class=\"str\">'/api/users'</span>).<span class=\"fn\">then</span>(r <span class=\"op\">=&gt;</span> r.<span class=\"fn\">json</span>()),\n  <span class=\"fn\">fetch</span>(<span class=\"str\">'/api/posts'</span>).<span class=\"fn\">then</span>(r <span class=\"op\">=&gt;</span> r.<span class=\"fn\">json</span>()),\n]);\n\n<span class=\"xm\">// allSettled — gets results even if some fail</span>\n<span class=\"kw\">const</span> results <span class=\"op\">=</span> <span class=\"kw\">await</span> Promise.<span class=\"fn\">allSettled</span>([p1, p2]);\n\n<span class=\"xm\">// Custom delay</span>\n<span class=\"kw\">const</span> <span class=\"fn\">delay</span> <span class=\"op\">=</span> ms <span class=\"op\">=&gt;</span> <span class=\"kw\">new</span> <span class=\"fn\">Promise</span>(\n  res <span class=\"op\">=&gt;</span> <span class=\"fn\">setTimeout</span>(res, ms));\n<span class=\"kw\">await</span> <span class=\"fn\">delay</span>(<span class=\"nm\">1000</span>); <span class=\"xm\">// pause 1s</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">why does async/await exist?</div><div class=\"et\"><div class=\"analogy\"><strong>☕ JavaScript is like a single-threaded barista.</strong> When you order coffee (a network request), the barista doesn't freeze staring at the machine. They take your order, go serve others, and come back when the coffee is ready. That \"come back when ready\" mechanic is what Promises handle. <code>async/await</code> is syntactic sugar that makes this look like normal sequential code.</div>Without async/await, you'd write messy <code>.then().then().catch()</code> chains (\"callback hell\"). async/await reads top-to-bottom like synchronous code — just with <code>await</code> before anything that takes time.</div></div>\n<div class=\"es\"><div class=\"el\">step-by-step breakdown</div><div class=\"et\"><strong>1.</strong> Mark the function <code>async</code>. Now it can use <code>await</code>.<br><strong>2.</strong> Put <code>await</code> before any Promise (like <code>fetch()</code>). This pauses <em>that function</em> until the Promise resolves — JS keeps running other things meanwhile.<br><strong>3.</strong> Wrap in <code>try/catch</code>. Any thrown error (or rejected Promise) is caught here.<br><br><div class=\"gotcha\"><strong>⚠ fetch() does NOT throw on HTTP errors!</strong> A 404 or 500 response still \"succeeds\" as far as fetch is concerned — it just sets <code>res.ok = false</code>. You MUST manually check <code>if (!res.ok) throw new Error(...)</code>. Every beginner gets burned by this at least once.</div></div></div>\n<div class=\"es\"><div class=\"el\">sequential vs parallel</div><div class=\"et\">Two <code>await</code>s in a row run one after another — each waits for the previous to finish. If each takes 500ms, total is 1000ms.<br><br><code>Promise.all([p1, p2])</code> fires both simultaneously and waits for whichever is slower. Total: ~500ms. <strong>Always use Promise.all when requests are independent of each other.</strong><br><br><div class=\"gotcha\"><strong>⚠ If ONE promise in Promise.all fails, the whole thing rejects.</strong> Use <code>Promise.allSettled</code> when you want results from all of them regardless of failures — it gives you <code>{status, value|reason}</code> for each.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-6",
    "tab": "js",
    "keywords": "control flow if ternary nullish coalescing optional chaining for loop switch short circuit",
    "number": "00000110",
    "title": "CONTROL FLOW",
    "tags": [
      "LOGIC",
      "LOOPS",
      "OPERATORS"
    ],
    "codeHtml": "<span class=\"xm\">// Ternary — inline if/else</span>\n<span class=\"kw\">const</span> label <span class=\"op\">=</span> age <span class=\"op\">&gt;=</span> <span class=\"nm\">18</span> <span class=\"op\">?</span> <span class=\"str\">'adult'</span> <span class=\"op\">:</span> <span class=\"str\">'minor'</span>;\n\n<span class=\"xm\">// ?? — fallback for null/undefined ONLY</span>\n<span class=\"kw\">const</span> val <span class=\"op\">=</span> input <span class=\"op\">??</span> <span class=\"str\">'default'</span>;\n<span class=\"xm\">// 0, '', false still pass through!</span>\n\n<span class=\"xm\">// ?. — safe property access chain</span>\n<span class=\"kw\">const</span> city <span class=\"op\">=</span> user<span class=\"op\">?.</span>address<span class=\"op\">?.</span>city;\n<span class=\"kw\">const</span> r    <span class=\"op\">=</span> fn<span class=\"op\">?.</span>();   <span class=\"xm\">// call only if fn exists</span>\n\n<span class=\"xm\">// Loops</span>\n<span class=\"kw\">for</span> (<span class=\"kw\">const</span> item <span class=\"kw\">of</span> arr)  {} <span class=\"xm\">// values</span>\n<span class=\"kw\">for</span> (<span class=\"kw\">const</span> key  <span class=\"kw\">in</span> obj)  {} <span class=\"xm\">// keys</span>\narr.<span class=\"fn\">forEach</span>((v, i) <span class=\"op\">=&gt;</span> {}) <span class=\"xm\">// can't break early</span>\n\n<span class=\"xm\">// Short-circuit</span>\nisAdmin <span class=\"op\">&amp;&amp;</span> <span class=\"fn\">showPanel</span>(); <span class=\"xm\">// right runs only if left truthy</span>\nval <span class=\"op\">||</span> <span class=\"str\">'fallback'</span>;     <span class=\"xm\">// right if left is ANY falsy</span>\nval <span class=\"op\">??</span> <span class=\"str\">'fallback'</span>;     <span class=\"xm\">// right only if null/undefined</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">ternary — compact if/else</div><div class=\"et\"><code>condition ? valueIfTrue : valueIfFalse</code><br><br>Read it as \"if age is 18+, give me 'adult', otherwise 'minor'.\" Use ternary for simple one-liners. For complex multi-branch logic, regular <code>if/else</code> is more readable. <div class=\"gotcha\"><strong>⚠ Never nest ternaries inside ternaries.</strong> It becomes unreadable instantly.</div></div></div>\n<div class=\"es\"><div class=\"el\">?? vs || — a crucial distinction</div><div class=\"et\">Both provide a fallback value, but they differ on what triggers it:<br><br><code>||</code> triggers for <em>any</em> falsy: <code>null</code>, <code>undefined</code>, <code>0</code>, <code>\"\"</code>, <code>false</code>, <code>NaN</code><br><code>??</code> triggers <em>only</em> for <code>null</code> or <code>undefined</code><br><br><div class=\"gotcha\"><strong>⚠ Real bug:</strong> A user sets their score to 0. With <code>score || 100</code>, you display 100 instead of 0 because 0 is falsy. With <code>score ?? 100</code>, you correctly show 0. When in doubt, <code>??</code> is almost always what you actually mean.</div></div></div>\n<div class=\"es\"><div class=\"el\">optional chaining ?.</div><div class=\"et\">Normally, <code>user.address.city</code> throws a <code>TypeError</code> if <code>address</code> is <code>null</code>. The whole script crashes.<br><br><code>user?.address?.city</code> means: \"try to access address — if it's null/undefined, give me <code>undefined</code> instead of crashing.\" Each <code>?.</code> is a safety guard. Essential when working with API responses where fields might be missing.</div></div>\n<div class=\"es\"><div class=\"el\">loops — which to use</div><div class=\"et\"><ul><li><code>for...of</code> → gives you <strong>values</strong>. Use for arrays.</li><li><code>for...in</code> → gives you <strong>keys</strong> (property names). Use for objects.</li><li><code>forEach</code> → like for...of but as a method. Cannot <code>break</code> or <code>return</code> early.</li><li>Classic <code>for (let i=0; i&lt;n; i++)</code> → when you need the index number.</li></ul></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-7",
    "tab": "js",
    "keywords": "class extends constructor this super static private closure scope hoisting modules export import",
    "number": "00000111",
    "title": "CLASSES, CLOSURES & MODULES",
    "tags": [
      "OOP",
      "CLOSURES",
      "MODULES"
    ],
    "codeHtml": "<span class=\"kw\">class</span> <span class=\"fn\">Animal</span> {\n  <span class=\"op\">#</span>sound <span class=\"op\">=</span> <span class=\"str\">'...'</span>;    <span class=\"xm\">// private field</span>\n  <span class=\"kw\">static</span> count <span class=\"op\">=</span> <span class=\"nm\">0</span>;   <span class=\"xm\">// class-level</span>\n  <span class=\"fn\">constructor</span>(name) {\n    <span class=\"kw\">this</span>.name <span class=\"op\">=</span> name;\n    Animal.count<span class=\"op\">++</span>;\n  }\n  <span class=\"fn\">speak</span>() { <span class=\"kw\">return</span> <span class=\"kw\">this</span>.<span class=\"op\">#</span>sound; }\n}\n<span class=\"kw\">class</span> <span class=\"fn\">Dog</span> <span class=\"kw\">extends</span> <span class=\"fn\">Animal</span> {\n  <span class=\"fn\">speak</span>() { <span class=\"kw\">return</span> <span class=\"str\">'Woof!'</span>; }\n}\n\n<span class=\"xm\">// Closure — function remembers its birthplace</span>\n<span class=\"kw\">function</span> <span class=\"fn\">makeCounter</span>() {\n  <span class=\"kw\">let</span> n <span class=\"op\">=</span> <span class=\"nm\">0</span>;\n  <span class=\"kw\">return</span> () <span class=\"op\">=&gt;</span> <span class=\"op\">++</span>n; <span class=\"xm\">// closes over n</span>\n}\n<span class=\"kw\">const</span> c <span class=\"op\">=</span> <span class=\"fn\">makeCounter</span>(); c(); <span class=\"xm\">// 1  c(); // 2</span>\n\n<span class=\"xm\">// ES Modules</span>\n<span class=\"kw\">export const</span> PI <span class=\"op\">=</span> <span class=\"nm\">3.14</span>;           <span class=\"xm\">// named</span>\n<span class=\"kw\">export default function</span> <span class=\"fn\">main</span>() {}    <span class=\"xm\">// default</span>\n<span class=\"kw\">import</span> main, { PI } <span class=\"kw\">from</span> <span class=\"str\">'./mod'</span>;",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">classes — blueprints for objects</div><div class=\"et\"><div class=\"analogy\"><strong>🏗️ A class is a cookie cutter.</strong> <code>new Dog(\"Rex\")</code> uses the Dog cutter to stamp out a specific Dog instance. The constructor is the setup instructions that run when stamping.</div><strong><code>#sound</code> (private):</strong> the <code>#</code> prefix means this property can only be accessed inside the class. Complete encapsulation.<br><strong><code>static count</code>:</strong> belongs to the class itself, not any instance. All instances share one copy.<br><strong><code>extends</code>:</strong> Dog inherits everything from Animal automatically and can override specific methods.</div></div>\n<div class=\"es\"><div class=\"el\">closures — a superpower</div><div class=\"et\">A closure is a function that <strong>remembers the variables from where it was created</strong> — even after the outer function has returned and is \"done.\"<br><br>In <code>makeCounter</code>: the inner function closes over <code>n</code>. Even after <code>makeCounter</code> returns, calling <code>c()</code> still increments that same <code>n</code>. The variable lives on inside the closure.<br><br><div class=\"tip\"><strong>💡 Closures are everywhere:</strong> React useState, event handlers, setTimeout callbacks, factory functions that remember configuration. Understanding closures is what separates beginners from intermediate developers.</div></div></div>\n<div class=\"es\"><div class=\"el\">ES modules — splitting code into files</div><div class=\"et\"><ul><li><strong>Named export:</strong> <code>export const PI = 3.14</code> — many per file. Import with exact name in <code>{}</code></li><li><strong>Default export:</strong> <code>export default function main()</code> — one per file. Import with any name you choose</li><li><strong>Import all:</strong> <code>import * as utils from \"./utils\"</code> — gives you an object with all named exports</li></ul></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-8",
    "tab": "js",
    "keywords": "try catch finally throw error custom class instanceof rethrow async error handling",
    "number": "00001000",
    "title": "ERROR HANDLING",
    "tags": [
      "ERRORS",
      "TRY/CATCH"
    ],
    "codeHtml": "<span class=\"kw\">try</span> {\n  <span class=\"kw\">const</span> d <span class=\"op\">=</span> JSON.<span class=\"fn\">parse</span>(badStr);\n} <span class=\"kw\">catch</span> (err) {\n  <span class=\"kw\">if</span> (err <span class=\"kw\">instanceof</span> SyntaxError) {\n    console.<span class=\"fn\">error</span>(<span class=\"str\">'Bad JSON'</span>);\n  } <span class=\"kw\">else throw</span> err; <span class=\"xm\">// re-throw unknown!</span>\n} <span class=\"kw\">finally</span> {\n  <span class=\"xm\">// always runs — cleanup here</span>\n}\n\n<span class=\"xm\">// Custom error class</span>\n<span class=\"kw\">class</span> <span class=\"fn\">AppError</span> <span class=\"kw\">extends</span> <span class=\"fn\">Error</span> {\n  <span class=\"fn\">constructor</span>(msg, statusCode <span class=\"op\">=</span> <span class=\"nm\">500</span>) {\n    <span class=\"kw\">super</span>(msg);\n    <span class=\"kw\">this</span>.statusCode <span class=\"op\">=</span> statusCode;\n    <span class=\"kw\">this</span>.name <span class=\"op\">=</span> <span class=\"str\">'AppError'</span>;\n  }\n}\n<span class=\"kw\">throw new</span> <span class=\"fn\">AppError</span>(<span class=\"str\">'Not found'</span>, <span class=\"nm\">404</span>);\n\n<span class=\"xm\">// Safe JSON parse helper</span>\n<span class=\"kw\">const</span> <span class=\"fn\">safeJSON</span> <span class=\"op\">=</span> (str, fallback <span class=\"op\">=</span> <span class=\"kw\">null</span>) <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">try</span> { <span class=\"kw\">return</span> JSON.<span class=\"fn\">parse</span>(str); }\n  <span class=\"kw\">catch</span> { <span class=\"kw\">return</span> fallback; }\n};",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what happens without error handling?</div><div class=\"et\"><div class=\"analogy\"><strong>💥 A chef with no plan B:</strong> if an ingredient is missing, the whole kitchen stops. That's an unhandled error in JS — the entire script crashes. <code>try/catch</code> gives the kitchen a plan B.</div></div></div>\n<div class=\"es\"><div class=\"el\">try / catch / finally breakdown</div><div class=\"et\"><strong><code>try { }</code></strong> — put risky code here. Any code that might throw.<br><br><strong><code>catch (err) { }</code></strong> — runs only if something in <code>try</code> throws. The <code>err</code> object has:<br><ul><li><code>err.message</code> — human-readable description</li><li><code>err.name</code> — the error type: \"TypeError\", \"SyntaxError\", etc.</li><li><code>err.stack</code> — full stack trace showing where it came from</li></ul><strong><code>finally { }</code></strong> — runs regardless of success or failure. Use it for cleanup: close DB connections, hide loading spinners, release file handles.<br><br><div class=\"gotcha\"><strong>⚠ Always re-throw errors you don't recognise.</strong> Silently swallowing unknown errors hides real bugs. Only handle what you understand; re-throw the rest.</div></div></div>\n<div class=\"es\"><div class=\"el\">custom error classes</div><div class=\"et\">Plain <code>Error</code> only has a message. By extending it, you attach extra metadata — like an HTTP status code. Now your error handler can check <code>err.statusCode</code> and send the right HTTP response automatically.<br><br>Always set <code>this.name</code> in custom error classes so <code>instanceof</code> checks work correctly after bundling.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-9",
    "tab": "ts",
    "keywords": "typescript types annotations string number boolean void never unknown any array tuple as const",
    "number": "00000001",
    "title": "BASIC TYPES & ANNOTATIONS",
    "tags": [
      "TYPES",
      "INFERENCE"
    ],
    "codeHtml": "<span class=\"xm\">// TS infers most types — only annotate when needed!</span>\n<span class=\"kw\">let</span> name<span class=\"op\">:</span> <span class=\"tp\">string</span>  <span class=\"op\">=</span> <span class=\"str\">'Alice'</span>;\n<span class=\"kw\">let</span> age<span class=\"op\">:</span>  <span class=\"tp\">number</span>  <span class=\"op\">=</span> <span class=\"nm\">25</span>;\n<span class=\"kw\">let</span> ok<span class=\"op\">:</span>   <span class=\"tp\">boolean</span> <span class=\"op\">=</span> <span class=\"kw\">true</span>;\n\n<span class=\"xm\">// Special types</span>\n<span class=\"kw\">let</span> a<span class=\"op\">:</span> <span class=\"tp\">any</span>;      <span class=\"xm\">// opt-out of checking ⚠ avoid!</span>\n<span class=\"kw\">let</span> b<span class=\"op\">:</span> <span class=\"tp\">unknown</span>;  <span class=\"xm\">// safe — must narrow before use</span>\n<span class=\"kw\">function</span> <span class=\"fn\">log</span>()<span class=\"op\">:</span> <span class=\"tp\">void</span>  {} <span class=\"xm\">// returns nothing</span>\n<span class=\"kw\">function</span> <span class=\"fn\">die</span>()<span class=\"op\">:</span> <span class=\"tp\">never</span> { <span class=\"kw\">throw new</span> <span class=\"fn\">Error</span>(); }\n\n<span class=\"xm\">// Arrays &amp; Tuples</span>\n<span class=\"kw\">const</span> nums<span class=\"op\">:</span> <span class=\"tp\">number</span>[]      <span class=\"op\">=</span> [<span class=\"nm\">1</span>,<span class=\"nm\">2</span>,<span class=\"nm\">3</span>];\n<span class=\"kw\">const</span> pair<span class=\"op\">:</span> [<span class=\"tp\">string</span>,<span class=\"tp\">number</span>] <span class=\"op\">=</span> [<span class=\"str\">'Alice'</span>,<span class=\"nm\">25</span>];\n\n<span class=\"xm\">// as const — infer literal types</span>\n<span class=\"kw\">const</span> ROLES <span class=\"op\">=</span> [<span class=\"str\">'admin'</span>,<span class=\"str\">'user'</span>] <span class=\"kw\">as const</span>;\n<span class=\"kw\">type</span> <span class=\"tp\">Role</span> <span class=\"op\">=</span> <span class=\"kw\">typeof</span> ROLES[<span class=\"tp\">number</span>];\n<span class=\"xm\">// → 'admin' | 'user'</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is TypeScript?</div><div class=\"et\"><div class=\"analogy\"><strong>🔍 TypeScript is JavaScript with a smart assistant</strong> that reads your code as you type and says \"hey, you're passing a number where a string is expected.\" It catches bugs at <em>compile time</em> (when you save) instead of <em>runtime</em> (when a real user is using your app).</div>TypeScript compiles to regular JavaScript — browsers never see <code>.ts</code> files. You write them, a compiler converts them to <code>.js</code>.</div></div>\n<div class=\"es\"><div class=\"el\">don't over-annotate!</div><div class=\"et\">TypeScript infers types automatically from values. <code>const x = 5</code> — TS already knows it's a <code>number</code>. You don't write <code>const x: number = 5</code>.<br><br><strong>Annotate when:</strong><ul><li>Function parameters — TS doesn't know what callers will pass</li><li>When initial value doesn't tell the full story: <code>useState&lt;User | null&gt;(null)</code></li><li>Return types — optional but serves as documentation</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">any vs unknown — critical difference</div><div class=\"et\"><strong><code>any</code></strong> silently turns off all type checking. TS stops complaining about anything you do with it. This defeats the entire purpose of TypeScript.<br><br><strong><code>unknown</code></strong> is the safe version. TS knows it could be anything, so it <em>forces</em> you to check the type before using it. Use this for API responses, <code>JSON.parse</code> results.<br><br><div class=\"gotcha\"><strong>⚠ Treat <code>any</code> like a code smell.</strong> If you reach for it, pause — can you use <code>unknown</code> + narrowing, or a generic instead?</div></div></div>\n<div class=\"es\"><div class=\"el\">void vs never</div><div class=\"et\"><code>void</code> — this function returns nothing (technically returns <code>undefined</code>). Like a <code>console.log()</code>.<br><br><code>never</code> — this function literally <em>never</em> finishes. Either it always throws an error or it runs forever. TS uses this to detect unreachable code.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-10",
    "tab": "ts",
    "keywords": "interface type alias extends optional readonly union intersection literal discriminated",
    "number": "00000010",
    "title": "INTERFACES & TYPE ALIASES",
    "tags": [
      "INTERFACE",
      "TYPE",
      "UNION"
    ],
    "codeHtml": "<span class=\"xm\">// Interface — contract for object shape</span>\n<span class=\"kw\">interface</span> <span class=\"tp\">User</span> {\n  id<span class=\"op\">:</span>         <span class=\"tp\">number</span>;\n  name<span class=\"op\">:</span>       <span class=\"tp\">string</span>;\n  email<span class=\"op\">?:</span>     <span class=\"tp\">string</span>;      <span class=\"xm\">// optional</span>\n  <span class=\"kw\">readonly</span> role<span class=\"op\">:</span> <span class=\"tp\">string</span>;  <span class=\"xm\">// immutable</span>\n}\n<span class=\"kw\">interface</span> <span class=\"tp\">Admin</span> <span class=\"kw\">extends</span> <span class=\"tp\">User</span> {\n  permissions<span class=\"op\">:</span> <span class=\"tp\">string</span>[];\n}\n\n<span class=\"xm\">// Type alias — handles things interface can't</span>\n<span class=\"kw\">type</span> <span class=\"tp\">ID</span>     <span class=\"op\">=</span> <span class=\"tp\">string</span> <span class=\"op\">|</span> <span class=\"tp\">number</span>;\n<span class=\"kw\">type</span> <span class=\"tp\">Status</span> <span class=\"op\">=</span> <span class=\"str\">'idle'</span> <span class=\"op\">|</span> <span class=\"str\">'loading'</span> <span class=\"op\">|</span> <span class=\"str\">'done'</span>;\n<span class=\"kw\">type</span> <span class=\"tp\">CB</span>     <span class=\"op\">=</span> (x<span class=\"op\">:</span> <span class=\"tp\">number</span>) <span class=\"op\">=&gt;</span> <span class=\"tp\">void</span>;\n\n<span class=\"xm\">// Discriminated union — typed variants</span>\n<span class=\"kw\">type</span> <span class=\"tp\">Result</span> <span class=\"op\">=</span>\n  <span class=\"op\">|</span> { kind<span class=\"op\">:</span> <span class=\"str\">'ok'</span>;    data<span class=\"op\">:</span> <span class=\"tp\">string</span> }\n  <span class=\"op\">|</span> { kind<span class=\"op\">:</span> <span class=\"str\">'error'</span>; msg<span class=\"op\">:</span>  <span class=\"tp\">string</span> };\n\n<span class=\"xm\">// Intersection — must have ALL fields</span>\n<span class=\"kw\">type</span> <span class=\"tp\">Stamped</span> <span class=\"op\">=</span> <span class=\"tp\">User</span> <span class=\"op\">&amp;</span> { createdAt<span class=\"op\">:</span> <span class=\"tp\">Date</span> };",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">interface — a contract</div><div class=\"et\"><div class=\"analogy\"><strong>📋 An interface is a job description.</strong> It says \"anyone claiming to be a User must have these fields.\" If you create an object missing a required field and claim it's a User, TypeScript flags it immediately.</div><ul><li><code>field?:</code> — optional field. Can be present or absent.</li><li><code>readonly field:</code> — set once at creation, never reassigned.</li><li><code>extends</code> — inherit all fields from another interface, then add more.</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">type alias — more flexible</div><div class=\"et\">A <code>type</code> can describe things an interface can't. <code>type Status = \"idle\" | \"loading\" | \"done\"</code> means \"Status can only be one of these exact three strings.\" TS will error if you try to assign \"banana\".<br><br><strong>interface vs type:</strong><br>Use <strong>interface</strong> for objects/classes — it can be extended and merged across files.<br>Use <strong>type</strong> for unions, primitives, tuples, function signatures.</div></div>\n<div class=\"es\"><div class=\"el\">discriminated unions — a superpower</div><div class=\"et\">The <code>Result</code> type has two variants, each with a unique <code>kind</code> literal. Inside <code>if (result.kind === \"ok\")</code>, TS automatically knows <code>result.data</code> is a string. In the else, it knows only <code>result.msg</code> exists.<br><br><div class=\"tip\"><strong>💡</strong> This is the TypeScript-native pattern for success/error types, state machines, event systems. Far safer than checking for undefined properties.</div></div></div>\n<div class=\"es\"><div class=\"el\">union vs intersection</div><div class=\"et\"><strong>Union <code>A | B</code></strong> — \"this OR that.\" The value satisfies one of the types.<br><strong>Intersection <code>A &amp; B</code></strong> — \"this AND that.\" The value must satisfy both types simultaneously — all fields from both are required.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-11",
    "tab": "ts",
    "keywords": "generics T generic function interface constraint extends keyof indexed access ReturnType",
    "number": "00000011",
    "title": "GENERICS",
    "tags": [
      "GENERICS",
      "REUSABLE",
      "KEYOF"
    ],
    "codeHtml": "<span class=\"xm\">// Generic function — type-safe for any type</span>\n<span class=\"kw\">function</span> <span class=\"fn\">identity</span><span class=\"op\">&lt;</span><span class=\"tp\">T</span><span class=\"op\">&gt;</span>(arg<span class=\"op\">:</span> <span class=\"tp\">T</span>)<span class=\"op\">:</span> <span class=\"tp\">T</span> {\n  <span class=\"kw\">return</span> arg;\n}\n\n<span class=\"xm\">// Constraint — T must have .length</span>\n<span class=\"kw\">function</span> <span class=\"fn\">getLen</span><span class=\"op\">&lt;</span><span class=\"tp\">T</span> <span class=\"kw\">extends</span> { length<span class=\"op\">:</span> <span class=\"tp\">number</span> }<span class=\"op\">&gt;</span>(\n  arg<span class=\"op\">:</span> <span class=\"tp\">T</span>\n) { <span class=\"kw\">return</span> arg.length; }\n\n<span class=\"xm\">// Generic interface</span>\n<span class=\"kw\">interface</span> <span class=\"tp\">ApiRes</span><span class=\"op\">&lt;</span><span class=\"tp\">T</span><span class=\"op\">&gt;</span> {\n  data<span class=\"op\">:</span>    <span class=\"tp\">T</span>;\n  status<span class=\"op\">:</span>  <span class=\"tp\">number</span>;\n  error<span class=\"op\">?:</span>  <span class=\"tp\">string</span>;\n}\n<span class=\"kw\">type</span> <span class=\"tp\">UserRes</span> <span class=\"op\">=</span> <span class=\"tp\">ApiRes</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">&gt;</span>;\n<span class=\"kw\">type</span> <span class=\"tp\">ListRes</span> <span class=\"op\">=</span> <span class=\"tp\">ApiRes</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span>[]<span class=\"op\">&gt;</span>;\n\n<span class=\"xm\">// keyof + T[K] — type-safe field access</span>\n<span class=\"kw\">function</span> <span class=\"fn\">getField</span><span class=\"op\">&lt;</span><span class=\"tp\">T</span>, <span class=\"tp\">K</span> <span class=\"kw\">extends</span> <span class=\"kw\">keyof</span> <span class=\"tp\">T</span><span class=\"op\">&gt;</span>(\n  obj<span class=\"op\">:</span> <span class=\"tp\">T</span>, key<span class=\"op\">:</span> <span class=\"tp\">K</span>\n)<span class=\"op\">:</span> <span class=\"tp\">T</span>[<span class=\"tp\">K</span>] { <span class=\"kw\">return</span> obj[key]; }\n<span class=\"fn\">getField</span>(user, <span class=\"str\">'name'</span>); <span class=\"xm\">// → string</span>\n<span class=\"fn\">getField</span>(user, <span class=\"str\">'xyz'</span>);  <span class=\"xm\">// ❌ compile error!</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is a generic?</div><div class=\"et\"><div class=\"analogy\"><strong>🧬 A generic is a function that takes the TYPE as a parameter.</strong> Think of a labeled container: a <code>Box&lt;T&gt;</code> can be a <code>Box&lt;Apple&gt;</code> or a <code>Box&lt;Book&gt;</code> — same structure, different content type. You fill in T when you use the function.</div>Without generics, you'd write the same function for every type: <code>getStringLength</code>, <code>getArrayLength</code>... With generics, one function handles all while staying fully typed.</div></div>\n<div class=\"es\"><div class=\"el\">constraints — T must have these features</div><div class=\"et\"><code>T extends { length: number }</code> means \"T can be any type, as long as it has a <code>length</code> property that's a number.\" This covers strings, arrays, NodeLists. You get the flexibility of generics while TS knows <code>arg.length</code> is safe to access.</div></div>\n<div class=\"es\"><div class=\"el\">generic interfaces — reusable shapes</div><div class=\"et\"><code>ApiRes&lt;T&gt;</code> is a wrapper that works for any data type. An API response always has <code>status</code> and maybe <code>error</code> — but <code>data</code> varies. Instead of writing 10 response interfaces, write one generic and fill in T at the usage site.</div></div>\n<div class=\"es\"><div class=\"el\">keyof + T[K] — type-safe property access</div><div class=\"et\"><code>keyof T</code> = union of all property name strings of T. For <code>User</code>, that's <code>\"id\" | \"name\" | \"email\"</code>.<br><code>T[K]</code> = the type of property K on T.<br><br>Combined: <code>getField(user, \"name\")</code> returns a <code>string</code>. <code>getField(user, \"id\")</code> returns a <code>number</code>. <code>getField(user, \"xyz\")</code> is a compile error. All automatically inferred.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-12",
    "tab": "ts",
    "keywords": "utility types Partial Required Readonly Pick Omit Record NonNullable ReturnType Parameters Awaited",
    "number": "00000100",
    "title": "UTILITY TYPES",
    "tags": [
      "PARTIAL",
      "PICK",
      "OMIT",
      "RECORD"
    ],
    "codeHtml": "<span class=\"kw\">interface</span> <span class=\"tp\">User</span> {\n  id<span class=\"op\">:</span> <span class=\"tp\">number</span>; name<span class=\"op\">:</span> <span class=\"tp\">string</span>; email<span class=\"op\">:</span> <span class=\"tp\">string</span>\n}\n\n<span class=\"tp\">Partial</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">&gt;</span>              <span class=\"xm\">// all fields optional</span>\n<span class=\"tp\">Required</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">&gt;</span>             <span class=\"xm\">// all fields required</span>\n<span class=\"tp\">Readonly</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">&gt;</span>             <span class=\"xm\">// all fields readonly</span>\n<span class=\"tp\">Pick</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span>, <span class=\"str\">'id'</span><span class=\"op\">|</span><span class=\"str\">'name'</span><span class=\"op\">&gt;</span>    <span class=\"xm\">// only id &amp; name</span>\n<span class=\"tp\">Omit</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span>, <span class=\"str\">'email'</span><span class=\"op\">&gt;</span>        <span class=\"xm\">// all except email</span>\n<span class=\"tp\">Record</span><span class=\"op\">&lt;</span><span class=\"tp\">string</span>,<span class=\"tp\">number</span><span class=\"op\">&gt;</span>      <span class=\"xm\">// { [k:string]: number }</span>\n<span class=\"tp\">NonNullable</span><span class=\"op\">&lt;</span><span class=\"tp\">string</span><span class=\"op\">|</span><span class=\"kw\">null</span><span class=\"op\">&gt;</span>  <span class=\"xm\">// string</span>\n\n<span class=\"xm\">// Function utilities</span>\n<span class=\"tp\">ReturnType</span><span class=\"op\">&lt;</span><span class=\"kw\">typeof</span> getUser<span class=\"op\">&gt;</span>    <span class=\"xm\">// infer return type</span>\n<span class=\"tp\">Parameters</span><span class=\"op\">&lt;</span><span class=\"kw\">typeof</span> getUser<span class=\"op\">&gt;</span>    <span class=\"xm\">// infer params tuple</span>\n<span class=\"tp\">Awaited</span><span class=\"op\">&lt;</span><span class=\"tp\">ReturnType</span><span class=\"op\">&lt;</span><span class=\"kw\">typeof</span> fn<span class=\"op\">&gt;&gt;</span> <span class=\"xm\">// unwrap Promise</span>\n\n<span class=\"xm\">// Real usage — patch/update function</span>\n<span class=\"kw\">function</span> <span class=\"fn\">updateUser</span>(\n  id<span class=\"op\">:</span> <span class=\"tp\">number</span>, patch<span class=\"op\">:</span> <span class=\"tp\">Partial</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">&gt;</span>\n) { <span class=\"xm\">/* patch is any subset of User */</span> }",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what are utility types?</div><div class=\"et\"><div class=\"analogy\"><strong>🛠️ Utility types are photo filters for types.</strong> Take a photo (your interface), apply a filter (the utility type), get a modified version. The original interface is untouched. You can keep applying different filters.</div>TypeScript ships with built-in type transformers. No need to manually rewrite your interface for every variation you need.</div></div>\n<div class=\"es\"><div class=\"el\">the most commonly used ones</div><div class=\"et\"><strong><code>Partial&lt;User&gt;</code></strong> — Makes all fields optional. Essential for update/PATCH endpoints where you only send the fields you want to change.<br><br><strong><code>Pick&lt;User, \"id\"|\"name\"&gt;</code></strong> — Creates a new type with only the specified fields. Useful when a function only needs part of a large object.<br><br><strong><code>Omit&lt;User, \"email\"&gt;</code></strong> — Everything except the listed fields. Common for \"create\" forms where server-generated fields (like <code>id</code>) shouldn't be in the request.<br><br><strong><code>Record&lt;string, number&gt;</code></strong> — A typed dictionary where all keys are strings and all values are numbers.</div></div>\n<div class=\"es\"><div class=\"el\">function utilities</div><div class=\"et\"><strong><code>ReturnType&lt;typeof fn&gt;</code></strong> — Extracts a function's return type automatically. If the return type changes, this updates everywhere automatically.<br><br><strong><code>Awaited&lt;T&gt;</code></strong> — Unwraps a Promise. <code>Awaited&lt;Promise&lt;User&gt;&gt;</code> gives you <code>User</code>. Perfect for getting the resolved type of an async function.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-13",
    "tab": "ts",
    "keywords": "narrowing type guard typeof instanceof in custom guard predicate is satisfies never exhaustive",
    "number": "00000101",
    "title": "TYPE NARROWING & GUARDS",
    "tags": [
      "NARROWING",
      "GUARDS",
      "SATISFIES"
    ],
    "codeHtml": "<span class=\"xm\">// typeof narrowing</span>\n<span class=\"kw\">function</span> <span class=\"fn\">fmt</span>(v<span class=\"op\">:</span> <span class=\"tp\">string</span> <span class=\"op\">|</span> <span class=\"tp\">number</span>) {\n  <span class=\"kw\">if</span> (<span class=\"kw\">typeof</span> v <span class=\"op\">===</span> <span class=\"str\">'string'</span>)\n    <span class=\"kw\">return</span> v.<span class=\"fn\">toUpperCase</span>();\n  <span class=\"kw\">return</span> v.<span class=\"fn\">toFixed</span>(<span class=\"nm\">2</span>); <span class=\"xm\">// TS knows: number here</span>\n}\n\n<span class=\"xm\">// instanceof</span>\n<span class=\"kw\">if</span> (err <span class=\"kw\">instanceof</span> TypeError) { <span class=\"xm\">/* err is TypeError */</span> }\n\n<span class=\"xm\">// Custom type guard</span>\n<span class=\"kw\">function</span> <span class=\"fn\">isUser</span>(obj<span class=\"op\">:</span> <span class=\"tp\">unknown</span>)<span class=\"op\">:</span> obj <span class=\"kw\">is</span> <span class=\"tp\">User</span> {\n  <span class=\"kw\">return</span> <span class=\"kw\">typeof</span> obj <span class=\"op\">===</span> <span class=\"str\">'object'</span>\n    <span class=\"op\">&amp;&amp;</span> obj <span class=\"op\">!==</span> <span class=\"kw\">null</span>\n    <span class=\"op\">&amp;&amp;</span> <span class=\"str\">'name'</span> <span class=\"kw\">in</span> obj;\n}\n<span class=\"kw\">if</span> (<span class=\"fn\">isUser</span>(data)) {\n  console.<span class=\"fn\">log</span>(data.name); <span class=\"xm\">// TS: data is User</span>\n}\n\n<span class=\"xm\">// satisfies — validate without widening type</span>\n<span class=\"kw\">const</span> cfg <span class=\"op\">=</span> {\n  port: <span class=\"nm\">3000</span>, host: <span class=\"str\">'localhost'</span>\n} <span class=\"kw\">satisfies</span> <span class=\"tp\">Config</span>;",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is narrowing?</div><div class=\"et\"><div class=\"analogy\"><strong>🔬 You get a mystery package (unknown type).</strong> Before opening it, you don't know if it's a book or a lamp. Once you look inside (narrow the type), you know exactly what it is and can handle it appropriately.</div>When you have <code>string | number</code>, TS doesn't know which one inside your function. Narrowing = writing a check that proves to TS which specific type it is in a given branch.</div></div>\n<div class=\"es\"><div class=\"el\">ways to narrow</div><div class=\"et\"><ul><li><code>typeof x === \"string\"</code> — works for primitives</li><li><code>x instanceof Error</code> — works for class instances</li><li><code>\"field\" in obj</code> — checks if a property exists</li><li>Comparing to a specific value: <code>if (x === \"idle\")</code> narrows a union to that literal</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">custom type guards — teach TS new tricks</div><div class=\"et\">Sometimes TS can't narrow automatically — like when validating an unknown API response. A custom type guard is a function that returns <code>boolean</code> AND tells TS \"if this returns true, the argument is this type.\"<br><br>The syntax <code>obj is User</code> as the return type is the magic. When it returns <code>true</code>, TS narrows <code>obj</code> to <code>User</code> in the calling code.</div></div>\n<div class=\"es\"><div class=\"el\">satisfies vs as — important distinction</div><div class=\"et\"><strong><code>as Type</code></strong> overrides TS inference — \"trust me, this is that type.\" Dangerous; TS stops checking.<br><br><strong><code>satisfies Type</code></strong> validates that the object matches the type without changing what TS infers the type to be. You get validation without losing the precise inferred types. Best of both worlds.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-14",
    "tab": "ts",
    "keywords": "typescript react props FC useState useRef event handler ReactNode ChangeEvent FormEvent",
    "number": "00000110",
    "title": "TS + REACT PATTERNS",
    "tags": [
      "REACT",
      "PROPS",
      "EVENTS"
    ],
    "codeHtml": "<span class=\"kw\">interface</span> <span class=\"tp\">BtnProps</span> {\n  label<span class=\"op\">:</span>    <span class=\"tp\">string</span>;\n  onClick<span class=\"op\">:</span>  () <span class=\"op\">=&gt;</span> <span class=\"tp\">void</span>;\n  disabled<span class=\"op\">?:</span> <span class=\"tp\">boolean</span>;\n  children<span class=\"op\">?:</span> React.<span class=\"tp\">ReactNode</span>;\n}\n<span class=\"kw\">function</span> <span class=\"fn\">Button</span>({\n  label, onClick, disabled <span class=\"op\">=</span> <span class=\"kw\">false</span>\n}<span class=\"op\">:</span> <span class=\"tp\">BtnProps</span>) {\n  <span class=\"kw\">return</span> <span class=\"tg\"><button< span=\"\"> <span class=\"fn\">onClick</span><span class=\"op\">={onClick}</span>\n    <span class=\"fn\">disabled</span><span class=\"op\">={disabled}&gt;</span><span class=\"op\">{label}</span><span class=\"tg\"></span>;\n}\n\n<span class=\"xm\">// Typed hooks</span>\n<span class=\"kw\">const</span> [count, setCount] <span class=\"op\">=</span> <span class=\"fn\">useState</span><span class=\"op\">&lt;</span><span class=\"tp\">number</span><span class=\"op\">&gt;</span>(<span class=\"nm\">0</span>);\n<span class=\"kw\">const</span> [user, setUser]  <span class=\"op\">=</span> <span class=\"fn\">useState</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">|</span><span class=\"kw\">null</span><span class=\"op\">&gt;</span>(<span class=\"kw\">null</span>);\n<span class=\"kw\">const</span> ref <span class=\"op\">=</span> <span class=\"fn\">useRef</span><span class=\"op\">&lt;</span>HTMLInputElement<span class=\"op\">&gt;</span>(<span class=\"kw\">null</span>);\n\n<span class=\"xm\">// Typed event handlers</span>\n<span class=\"kw\">const</span> <span class=\"fn\">onChange</span> <span class=\"op\">=</span> (\n  e<span class=\"op\">:</span> React.<span class=\"tp\">ChangeEvent</span><span class=\"op\">&lt;</span>HTMLInputElement<span class=\"op\">&gt;</span>\n) <span class=\"op\">=&gt;</span> { console.<span class=\"fn\">log</span>(e.target.value); };\n<span class=\"kw\">const</span> <span class=\"fn\">onSubmit</span> <span class=\"op\">=</span> (e<span class=\"op\">:</span> React.<span class=\"tp\">FormEvent</span>) <span class=\"op\">=&gt;</span>\n  e.<span class=\"fn\">preventDefault</span>();</button<></span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">why type your components?</div><div class=\"et\"><div class=\"analogy\"><strong>📜 Typed props are like a plug specification.</strong> A typed component says \"I accept exactly these inputs.\" If you pass the wrong type or forget a required prop, TS tells you immediately — not when a user finds the bug in production.</div></div></div>\n<div class=\"es\"><div class=\"el\">props interface best practices</div><div class=\"et\">Always define a <code>Props</code> interface for every non-trivial component. It serves as live documentation — anyone reading your code instantly knows what the component needs and what's optional.<br><br><strong><code>React.ReactNode</code></strong> — widest type for \"anything React can render\": JSX, strings, numbers, arrays, null. Use for <code>children</code> props.<br><br><strong><code>React.ReactElement</code></strong> — narrower, only actual JSX (not string/null). Use when you specifically need JSX output.</div></div>\n<div class=\"es\"><div class=\"el\">when to annotate hooks</div><div class=\"et\">Most of the time, TS infers from the initial value: <code>useState(0)</code> = <code>number</code>.<br><br>Annotate when the initial value doesn't tell the full story:<br><code>useState&lt;User | null&gt;(null)</code> — TS would infer <code>null</code> type only, losing User autocomplete later.<br><br>Always type <code>useRef</code> for DOM elements — otherwise <code>ref.current</code> is untyped.</div></div>\n<div class=\"es\"><div class=\"el\">event handler types</div><div class=\"et\"><ul><li><code>React.ChangeEvent&lt;HTMLInputElement&gt;</code> — for <code>onChange</code> on inputs</li><li><code>React.FormEvent</code> — for <code>onSubmit</code> on forms</li><li><code>React.MouseEvent&lt;HTMLButtonElement&gt;</code> — for click events</li><li><code>React.KeyboardEvent</code> — for keyboard events</li></ul>The generic parameter types <code>event.target</code>, giving you autocomplete on <code>value</code>, <code>checked</code>, etc.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-15",
    "tab": "react",
    "keywords": "component jsx props children key list conditional rendering className htmlFor fragment",
    "number": "00000001",
    "title": "COMPONENTS & JSX",
    "tags": [
      "JSX",
      "PROPS",
      "LISTS"
    ],
    "codeHtml": "<span class=\"kw\">function</span> <span class=\"fn\">Card</span>({ title, show <span class=\"op\">=</span> <span class=\"kw\">true</span>, children }) {\n  <span class=\"kw\">return</span> (\n    <span class=\"tg\"><div< span=\"\"> <span class=\"fn\">className</span><span class=\"op\">=</span><span class=\"str\">'card'</span><span class=\"tg\">&gt;</span>\n      <span class=\"tg\"><h2><span class=\"op\">{title}</span><span class=\"tg\"></span></h2></span>\n\n      <span class=\"xm\">{/* Conditional rendering */}</span>\n      <span class=\"op\">{show &amp;&amp;</span> <span class=\"tg\"><p>Visible<span class=\"tg\"></span></p></span><span class=\"op\">}</span>\n      <span class=\"op\">{show ?</span> <span class=\"tg\"><a></a></span><a> <span class=\"op\">:</span> <span class=\"tg\"><b></b></span><b><span class=\"op\">}</span>\n\n      <span class=\"xm\">{/* List — key is required! */}</span>\n      <span class=\"op\">{items.<span class=\"fn\">map</span>(item <span class=\"op\">=&gt;</span> (\n        <span class=\"tg\"><li< span=\"\"> <span class=\"fn\">key</span><span class=\"op\">={item.id}<span class=\"tg\">&gt;</span><span class=\"op\">{item.name}</span><span class=\"tg\"></span>\n      ))}</span>\n\n      <span class=\"op\">{children}</span>\n    <span class=\"tg\"></span></li<></span></span></b></a></div<></span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is a component?</div><div class=\"et\"><div class=\"analogy\"><strong>🧩 Components are LEGO bricks.</strong> You design small, reusable bricks (Button, Card, Input) and snap them together to build bigger things (Form, Page, Dashboard). Each brick knows its own look and behaviour. You configure it with props (the setup instructions on the brick).</div>A React component is just a JavaScript function that returns JSX. The name must start with a capital letter so React knows it's a component, not a plain HTML tag.</div></div>\n<div class=\"es\"><div class=\"el\">JSX differences from HTML</div><div class=\"et\"><ul><li><code>class</code> → <code>className</code> (class is reserved in JS)</li><li><code>for</code> → <code>htmlFor</code> (for is reserved in JS)</li><li>Events are camelCase: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code></li><li>Self-closing tags need <code>/&gt;</code>: <code>&lt;input /&gt;</code></li><li>Expressions go in <code>{}</code>: <code>{title}</code>, <code>{2 + 2}</code>, <code>{isOpen ? \"yes\" : \"no\"}</code></li></ul></div></div>\n<div class=\"es\"><div class=\"el\">the key prop — very important</div><div class=\"et\"><code>key</code> on list items is required. React uses it internally to track which items are new, removed, or moved when the list changes.<br><br><div class=\"gotcha\"><strong>⚠ Don't use array index as key</strong> when the list can reorder or change. Use a stable unique ID from your data. Index-as-key causes subtle bugs: wrong items updating, animations on wrong elements, state ending up in the wrong component.</div></div></div>\n<div class=\"es\"><div class=\"el\">children prop</div><div class=\"et\">The <code>children</code> prop is whatever you put between the opening and closing tags: <code>&lt;Card&gt;This is children&lt;/Card&gt;</code>. It lets you build \"wrapper\" components — modals, panels, layouts — that don't care about what's inside.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-16",
    "tab": "react",
    "keywords": "useState state setter functional update re-render lazy initializer immutable object array",
    "number": "00000010",
    "title": "USESTATE",
    "tags": [
      "STATE",
      "HOOKS",
      "MEMORY"
    ],
    "codeHtml": "<span class=\"kw\">import</span> { useState } <span class=\"kw\">from</span> <span class=\"str\">'react'</span>;\n\n<span class=\"kw\">function</span> <span class=\"fn\">Counter</span>() {\n  <span class=\"kw\">const</span> [count, setCount] <span class=\"op\">=</span> <span class=\"fn\">useState</span>(<span class=\"nm\">0</span>);\n  <span class=\"kw\">const</span> [user,  setUser]  <span class=\"op\">=</span> <span class=\"fn\">useState</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span><span class=\"op\">|</span><span class=\"kw\">null</span><span class=\"op\">&gt;</span>(<span class=\"kw\">null</span>);\n\n  <span class=\"xm\">// Functional update — use when new val depends on old</span>\n  <span class=\"kw\">const</span> <span class=\"fn\">inc</span> <span class=\"op\">=</span> () <span class=\"op\">=&gt;</span> <span class=\"fn\">setCount</span>(c <span class=\"op\">=&gt;</span> c <span class=\"op\">+</span> <span class=\"nm\">1</span>);\n\n  <span class=\"xm\">// Updating object state — spread!</span>\n  <span class=\"kw\">const</span> <span class=\"fn\">rename</span> <span class=\"op\">=</span> name <span class=\"op\">=&gt;</span>\n    <span class=\"fn\">setUser</span>(u <span class=\"op\">=&gt;</span> u <span class=\"op\">?</span> { <span class=\"op\">...</span>u, name } <span class=\"op\">:</span> u);\n\n  <span class=\"xm\">// Lazy init — fn runs ONCE on mount</span>\n  <span class=\"kw\">const</span> [data] <span class=\"op\">=</span> <span class=\"fn\">useState</span>(() <span class=\"op\">=&gt;</span>\n    JSON.<span class=\"fn\">parse</span>(localStorage.<span class=\"fn\">getItem</span>(<span class=\"str\">'d'</span>))\n  );\n\n  <span class=\"kw\">return</span> <span class=\"tg\"><button< span=\"\"> <span class=\"fn\">onClick</span><span class=\"op\">={inc}&gt;</span><span class=\"op\">{count}</span><span class=\"tg\"></span>;\n}</button<></span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is state?</div><div class=\"et\"><div class=\"analogy\"><strong>🧠 Without state, every re-render erases all local variables</strong> — like a whiteboard that's cleaned every time someone enters the room. State is a special memory that survives re-renders. When state changes, React re-renders the component to show the new value.</div></div></div>\n<div class=\"es\"><div class=\"el\">useState returns two things</div><div class=\"et\"><code>useState(0)</code> returns an array with two items: the current value and a setter function. You destructure them: <code>const [count, setCount] = useState(0)</code>.<br><br>The naming convention is <code>[thing, setThing]</code> — always value first, setter second. This is a universal convention in the React world.</div></div>\n<div class=\"es\"><div class=\"el\">three rules of state</div><div class=\"et\"><ul><li><strong>Never mutate directly.</strong> <code>count++</code> changes the number but React doesn't know about it — no re-render. Always call the setter: <code>setCount(c + 1)</code></li><li><strong>Use the functional form</strong> <code>c =&gt; c + 1</code> when the new value depends on the old one. React batches updates, so <code>count</code> inside the handler might be stale. The functional form always gets the freshest value.</li><li><strong>Spread objects and arrays.</strong> <code>setUser({ ...user, name: \"Bob\" })</code> — never mutate the object directly. Objects are references; mutating them skips React's change detection.</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">lazy initialisation</div><div class=\"et\">When you pass a <strong>function</strong> to <code>useState</code> (not a value), React only calls it on the very first render. Useful when computing the initial value is expensive — like reading from localStorage. Without lazy init, that read would happen on every single re-render.</div></div>",
    "exercise": {
      "question": "When should you use the functional update form of setState (e.g., `setCount(c => c + 1)`)?",
      "options": [
        "When updating string values.",
        "When the new state depends on the previous state.",
        "When you need the state to update synchronously.",
        "Only when updating complex objects."
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-17",
    "tab": "react",
    "keywords": "useEffect side effect fetch cleanup mount unmount dependency abort controller async",
    "number": "00000011",
    "title": "USEEFFECT",
    "tags": [
      "EFFECTS",
      "LIFECYCLE",
      "FETCH"
    ],
    "codeHtml": "<span class=\"xm\">// Run once on mount</span>\n<span class=\"fn\">useEffect</span>(() <span class=\"op\">=&gt;</span> { <span class=\"fn\">fetchData</span>(); }, []);\n\n<span class=\"xm\">// Re-run when id changes</span>\n<span class=\"fn\">useEffect</span>(() <span class=\"op\">=&gt;</span> { <span class=\"fn\">fetchUser</span>(id); }, [id]);\n\n<span class=\"xm\">// Proper pattern: fetch + cleanup</span>\n<span class=\"fn\">useEffect</span>(() <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">const</span> ctrl <span class=\"op\">=</span> <span class=\"kw\">new</span> <span class=\"fn\">AbortController</span>();\n\n  <span class=\"fn\">fetch</span>(<span class=\"str\">`/api/users/${id}`</span>, {\n    signal: ctrl.signal\n  })\n    .<span class=\"fn\">then</span>(r <span class=\"op\">=&gt;</span> r.<span class=\"fn\">json</span>()).<span class=\"fn\">then</span>(setUser)\n    .<span class=\"fn\">catch</span>(e <span class=\"op\">=&gt;</span> {\n      <span class=\"kw\">if</span> (e.name <span class=\"op\">!==</span> <span class=\"str\">'AbortError'</span>) setErr(e);\n    });\n\n  <span class=\"kw\">return</span> () <span class=\"op\">=&gt;</span> ctrl.<span class=\"fn\">abort</span>(); <span class=\"xm\">// cleanup!</span>\n}, [id]);",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is a side effect?</div><div class=\"et\"><div class=\"analogy\"><strong>🔔 A React component's main job is to return JSX.</strong> Anything else — fetching data, subscribing to events, updating the document title, setting a timer — is a \"side effect.\" useEffect is the designated place for these, so they don't interrupt the pure rendering process.</div></div></div>\n<div class=\"es\"><div class=\"el\">the dependency array — the most critical part</div><div class=\"et\"><ul><li><code>[]</code> (empty) — run once after the first render (mount). Good for initial fetches.</li><li><code>[id]</code> — re-run whenever <code>id</code> changes. React compares old vs new value.</li><li>No array — run after EVERY render. Almost never what you want; causes infinite loops if you set state inside.</li></ul><div class=\"gotcha\"><strong>⚠ The dependency array must include everything the effect reads from outside itself.</strong> If your effect uses <code>userId</code> and <code>token</code>, both must be in the array. Missing deps = stale data bugs that are hard to debug.</div></div></div>\n<div class=\"es\"><div class=\"el\">cleanup function — always return for fetches</div><div class=\"et\">The function you return from <code>useEffect</code> is the cleanup. React calls it before running the effect again AND when the component unmounts.<br><br>Without AbortController: user navigates away during a slow fetch → fetch completes → tries to call <code>setUser</code> on an unmounted component → memory leak + possible error.<br><br>With AbortController: cleanup runs → abort fires → fetch cancels → no stale update. Clean and correct.</div></div>\n<div class=\"es\"><div class=\"el\">can't use async directly</div><div class=\"et\"><div class=\"gotcha\"><strong>⚠ Never make the useEffect callback async.</strong> <code>useEffect(async () =&gt; {})</code> breaks cleanup (async functions return a Promise, but the cleanup must be a plain function or undefined). Instead: define an async function inside and immediately call it: <code>const load = async () =&gt; {...}; load();</code></div></div></div>",
    "exercise": {
      "question": "What does an empty dependency array `[]` in useEffect mean?",
      "options": [
        "It runs on every single render.",
        "It runs only when state changes.",
        "It runs exactly once after the initial render.",
        "It never runs."
      ],
      "correctAnswerIndex": 2
    }
  },
  {
    "id": "card-18",
    "tab": "react",
    "keywords": "useContext context provider consumer prop drilling global state theme auth createContext",
    "number": "00000100",
    "title": "USECONTEXT",
    "tags": [
      "CONTEXT",
      "GLOBAL STATE",
      "PROP DRILLING"
    ],
    "codeHtml": "<span class=\"kw\">const</span> ThemeCtx <span class=\"op\">=</span> <span class=\"fn\">createContext</span>(<span class=\"kw\">null</span>);\n\n<span class=\"kw\">function</span> <span class=\"fn\">ThemeProvider</span>({ children }) {\n  <span class=\"kw\">const</span> [theme, setTheme] <span class=\"op\">=</span> <span class=\"fn\">useState</span>(<span class=\"str\">'dark'</span>);\n  <span class=\"kw\">const</span> <span class=\"fn\">toggle</span> <span class=\"op\">=</span> () <span class=\"op\">=&gt;</span>\n    <span class=\"fn\">setTheme</span>(t <span class=\"op\">=&gt;</span> t<span class=\"op\">===</span><span class=\"str\">'dark'</span> <span class=\"op\">?</span> <span class=\"str\">'light'</span> <span class=\"op\">:</span> <span class=\"str\">'dark'</span>);\n  <span class=\"kw\">return</span> (\n    <span class=\"tg\"><themectx.provider< span=\"\"> <span class=\"fn\">value</span><span class=\"op\">={{</span>theme,toggle<span class=\"op\">}}&gt;</span>\n      <span class=\"op\">{children}</span>\n    <span class=\"tg\"></span>\n  );\n}\n\n<span class=\"xm\">// Safe custom hook wrapper</span>\n<span class=\"kw\">function</span> <span class=\"fn\">useTheme</span>() {\n  <span class=\"kw\">const</span> ctx <span class=\"op\">=</span> <span class=\"fn\">useContext</span>(ThemeCtx);\n  <span class=\"kw\">if</span> (!ctx) <span class=\"kw\">throw new</span> <span class=\"fn\">Error</span>(\n    <span class=\"str\">'useTheme must be inside ThemeProvider'</span>\n  );\n  <span class=\"kw\">return</span> ctx;\n}\n<span class=\"kw\">const</span> { theme, toggle } <span class=\"op\">=</span> <span class=\"fn\">useTheme</span>();</themectx.provider<></span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">the problem: prop drilling</div><div class=\"et\"><div class=\"analogy\"><strong>📡 Prop drilling:</strong> You have user data at the top (App component). A button deep inside needs it: App → Dashboard → Sidebar → UserPanel → Avatar → Button. You'd pass the user prop through every single layer even though the middle ones don't care.<br><br><strong>Context = a radio broadcast.</strong> The Provider at the top broadcasts data. Any component can tune in with <code>useContext</code>, no matter how deep — no manual prop passing needed.</div></div></div>\n<div class=\"es\"><div class=\"el\">three steps to use context</div><div class=\"et\"><strong>1. Create</strong> — <code>createContext(defaultValue)</code> creates the \"channel.\"<br><br><strong>2. Provide</strong> — Wrap your tree with <code>&lt;ThemeCtx.Provider value={...}&gt;</code>. This \"broadcasts\" the value.<br><br><strong>3. Consume</strong> — Call <code>useContext(ThemeCtx)</code> in any component. React finds the nearest Provider above it.</div></div>\n<div class=\"es\"><div class=\"el\">custom hook wrapper — always do this</div><div class=\"et\">Instead of calling <code>useContext(ThemeCtx)</code> directly in components, wrap it in a custom hook that checks if you're inside the Provider. This prevents the confusing \"cannot destructure property of null\" error with a clear, readable message.<br><br><div class=\"tip\"><strong>💡 Common uses:</strong> auth (user data, login/logout), theme, language/locale, shopping cart, modal state, app-wide notifications.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-19",
    "tab": "react",
    "keywords": "useReducer reducer dispatch action state machine complex state switch discriminated union",
    "number": "00000101",
    "title": "USEREDUCER",
    "tags": [
      "STATE",
      "DISPATCH",
      "REDUCER"
    ],
    "codeHtml": "<span class=\"kw\">type</span> <span class=\"tp\">State</span>  <span class=\"op\">=</span> { count<span class=\"op\">:</span> <span class=\"tp\">number</span>; step<span class=\"op\">:</span> <span class=\"tp\">number</span> };\n<span class=\"kw\">type</span> <span class=\"tp\">Action</span> <span class=\"op\">=</span>\n  <span class=\"op\">|</span> { type<span class=\"op\">:</span> <span class=\"str\">'inc'</span> }\n  <span class=\"op\">|</span> { type<span class=\"op\">:</span> <span class=\"str\">'dec'</span> }\n  <span class=\"op\">|</span> { type<span class=\"op\">:</span> <span class=\"str\">'setStep'</span>; payload<span class=\"op\">:</span> <span class=\"tp\">number</span> };\n\n<span class=\"kw\">function</span> <span class=\"fn\">reducer</span>(s<span class=\"op\">:</span> <span class=\"tp\">State</span>, a<span class=\"op\">:</span> <span class=\"tp\">Action</span>)<span class=\"op\">:</span> <span class=\"tp\">State</span> {\n  <span class=\"kw\">switch</span> (a.type) {\n    <span class=\"kw\">case</span> <span class=\"str\">'inc'</span>:\n      <span class=\"kw\">return</span> { <span class=\"op\">...</span>s, count: s.count <span class=\"op\">+</span> s.step };\n    <span class=\"kw\">case</span> <span class=\"str\">'dec'</span>:\n      <span class=\"kw\">return</span> { <span class=\"op\">...</span>s, count: s.count <span class=\"op\">-</span> s.step };\n    <span class=\"kw\">case</span> <span class=\"str\">'setStep'</span>:\n      <span class=\"kw\">return</span> { <span class=\"op\">...</span>s, step: a.payload };\n  }\n}\n\n<span class=\"kw\">const</span> [state, dispatch] <span class=\"op\">=</span>\n  <span class=\"fn\">useReducer</span>(reducer, { count:<span class=\"nm\">0</span>, step:<span class=\"nm\">1</span> });\n\ndispatch({ type: <span class=\"str\">'inc'</span> });\ndispatch({ type: <span class=\"str\">'setStep'</span>, payload: <span class=\"nm\">5</span> });",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">useState vs useReducer</div><div class=\"et\"><div class=\"analogy\"><strong>🎮 useState is a simple on/off switch.</strong> useReducer is a game controller — you press different buttons (dispatch actions) and the game (reducer) figures out what the new state should be.</div>Use <code>useReducer</code> when:<ul><li>State has multiple related sub-values (count + step + history)</li><li>Many different update patterns exist (increment, decrement, reset, setStep)</li><li>The next state depends on the previous in complex ways</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">how it works</div><div class=\"et\"><strong>Action</strong> — plain object describing what happened. Convention: <code>type</code> string + optional <code>payload</code> with extra data.<br><br><strong>Reducer</strong> — pure function: <code>(currentState, action) =&gt; newState</code>. No side effects, no async, pure logic.<br><br><strong>dispatch</strong> — call this to trigger a state change. React runs your reducer with current state + action, gets new state, re-renders.</div></div>\n<div class=\"es\"><div class=\"el\">why it shines with TypeScript</div><div class=\"et\">The discriminated union for <code>Action</code> means TS knows exactly what shape each action has. When handling <code>\"setStep\"</code>, TS knows <code>a.payload</code> is a number. When handling <code>\"inc\"</code>, TS knows there's no payload. All fully type-checked — you can't dispatch an invalid action.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-20",
    "tab": "react",
    "keywords": "custom hook useFetch useDebounce reusable logic use prefix useState useEffect combined",
    "number": "00000110",
    "title": "CUSTOM HOOKS",
    "tags": [
      "HOOKS",
      "REUSABLE",
      "EXTRACT"
    ],
    "codeHtml": "<span class=\"xm\">// Name MUST start with 'use'</span>\n<span class=\"kw\">function</span> <span class=\"fn\">useFetch</span><span class=\"op\">&lt;</span><span class=\"tp\">T</span><span class=\"op\">&gt;</span>(url<span class=\"op\">:</span> <span class=\"tp\">string</span>) {\n  <span class=\"kw\">const</span> [data,    setData]    <span class=\"op\">=</span> <span class=\"fn\">useState</span><span class=\"op\">&lt;</span><span class=\"tp\">T</span><span class=\"op\">|</span><span class=\"kw\">null</span><span class=\"op\">&gt;</span>(<span class=\"kw\">null</span>);\n  <span class=\"kw\">const</span> [loading, setLoading] <span class=\"op\">=</span> <span class=\"fn\">useState</span>(<span class=\"kw\">true</span>);\n  <span class=\"kw\">const</span> [error,   setError]   <span class=\"op\">=</span> <span class=\"fn\">useState</span><span class=\"op\">&lt;</span><span class=\"tp\">Error</span><span class=\"op\">|</span><span class=\"kw\">null</span><span class=\"op\">&gt;</span>(<span class=\"kw\">null</span>);\n\n  <span class=\"fn\">useEffect</span>(() <span class=\"op\">=&gt;</span> {\n    <span class=\"kw\">const</span> ctrl <span class=\"op\">=</span> <span class=\"kw\">new</span> <span class=\"fn\">AbortController</span>();\n    <span class=\"fn\">fetch</span>(url, { signal: ctrl.signal })\n      .<span class=\"fn\">then</span>(r <span class=\"op\">=&gt;</span> r.<span class=\"fn\">json</span>())\n      .<span class=\"fn\">then</span>((d<span class=\"op\">:</span> <span class=\"tp\">T</span>) <span class=\"op\">=&gt;</span> {\n        <span class=\"fn\">setData</span>(d); <span class=\"fn\">setLoading</span>(<span class=\"kw\">false</span>);\n      })\n      .<span class=\"fn\">catch</span>(e <span class=\"op\">=&gt;</span> {\n        <span class=\"kw\">if</span>(e.name<span class=\"op\">!==</span><span class=\"str\">'AbortError'</span>){\n          <span class=\"fn\">setError</span>(e); <span class=\"fn\">setLoading</span>(<span class=\"kw\">false</span>);\n        }\n      });\n    <span class=\"kw\">return</span> () <span class=\"op\">=&gt;</span> ctrl.<span class=\"fn\">abort</span>();\n  }, [url]);\n\n  <span class=\"kw\">return</span> { data, loading, error };\n}\n\n<span class=\"xm\">// Usage — fully typed!</span>\n<span class=\"kw\">const</span> { data, loading } <span class=\"op\">=</span> <span class=\"fn\">useFetch</span><span class=\"op\">&lt;</span><span class=\"tp\">User</span>[]<span class=\"op\">&gt;</span>(<span class=\"str\">'/api/users'</span>);",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">when to extract a custom hook?</div><div class=\"et\"><div class=\"analogy\"><strong>🪝 Custom hooks are like creating your own power tools.</strong> Instead of assembling the same combination of standard tools every time you need to drill a hole, you build a specialised drill that does exactly that job with one trigger pull.</div>The signal: when you copy-paste the same <code>useState + useEffect</code> combo across multiple components. Extract it into a custom hook.</div></div>\n<div class=\"es\"><div class=\"el\">the use prefix — not just convention</div><div class=\"et\">The <code>use</code> prefix is enforced by React's linter. Hooks can only be called at the top level of components or other hooks — not in loops, conditions, or nested functions. The linter uses <code>use</code> to know \"this function might call hooks, apply the rules.\"</div></div>\n<div class=\"es\"><div class=\"el\">what useFetch gives you</div><div class=\"et\">Every component that fetches data needs the same three pieces: <code>data</code>, <code>loading</code>, <code>error</code>. Without a hook, you write those three <code>useState</code> calls + a <code>useEffect</code> with AbortController in every single component. With <code>useFetch</code>, it's one line. With the TypeScript generic <code>&lt;User[]&gt;</code>, the returned <code>data</code> is typed as <code>User[] | null</code> — full autocomplete, no casting needed.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-21",
    "tab": "express",
    "keywords": "express setup server listen json port middleware static urlencoded app use",
    "number": "00000001",
    "title": "SETUP & SERVER",
    "tags": [
      "SETUP",
      "SERVER",
      "MIDDLEWARE"
    ],
    "codeHtml": "<span class=\"kw\">import</span> express, { Request, Response,\n  NextFunction } <span class=\"kw\">from</span> <span class=\"str\">'express'</span>;\n\n<span class=\"kw\">const</span> app  <span class=\"op\">=</span> <span class=\"fn\">express</span>();\n<span class=\"kw\">const</span> PORT <span class=\"op\">=</span> process.env.PORT <span class=\"op\">||</span> <span class=\"nm\">3000</span>;\n\n<span class=\"xm\">// ORDER MATTERS!</span>\napp.<span class=\"fn\">use</span>(express.<span class=\"fn\">json</span>());\n<span class=\"xm\">// ↑ without this, req.body is always undefined</span>\n\napp.<span class=\"fn\">use</span>(express.<span class=\"fn\">urlencoded</span>({\n  extended: <span class=\"kw\">true</span>\n})); <span class=\"xm\">// parse HTML form submissions</span>\n\napp.<span class=\"fn\">use</span>(express.<span class=\"fn\">static</span>(<span class=\"str\">'public'</span>));\n<span class=\"xm\">// serve files from /public folder</span>\n\n<span class=\"xm\">// YOUR ROUTES GO HERE</span>\n\napp.<span class=\"fn\">listen</span>(PORT, () <span class=\"op\">=&gt;</span>\n  console.<span class=\"fn\">log</span>(<span class=\"str\">`▸ localhost:<span class=\"nm\">${PORT}</span>`</span>)\n);",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is Express?</div><div class=\"et\"><div class=\"analogy\"><strong>🏨 Express is like a hotel front desk.</strong> Requests (guests) come in through the front door. The front desk (Express) looks at what they want (URL + HTTP method) and routes them to the right room (the right handler function). Middleware is the security check and bag tag that every guest passes through.</div>Express is a minimal Node.js framework for building HTTP servers (backends/APIs). Your React frontend calls these endpoints to get and save data.</div></div>\n<div class=\"es\"><div class=\"el\">why express.json() is not optional</div><div class=\"et\"><div class=\"gotcha\"><strong>⚠ Without <code>express.json()</code>, <code>req.body</code> is always <code>undefined</code>.</strong> When a client sends a POST request with JSON data, Express doesn't parse the body by default — you have to tell it to. This is the #1 Express beginner mistake. Always put this before your routes.</div></div></div>\n<div class=\"es\"><div class=\"el\">order matters in Express</div><div class=\"et\">Express runs middleware and routes in the exact order you call <code>app.use()</code>. The recommended order:<ol><li>Security middleware (cors, helmet)</li><li>Body parsers (express.json, express.urlencoded)</li><li>Static file server</li><li>Application routes</li><li>404 handler</li><li>Error handler (last!)</li></ol></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-22",
    "tab": "express",
    "keywords": "routes get post put delete patch params body query CRUD status code 200 201 400 401 404",
    "number": "00000010",
    "title": "ROUTES & CRUD",
    "tags": [
      "ROUTES",
      "CRUD",
      "STATUS CODES"
    ],
    "codeHtml": "app.<span class=\"fn\">get</span>(<span class=\"str\">'/users'</span>, <span class=\"kw\">async</span> (req, res) <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">const</span> q <span class=\"op\">=</span> req.query.search; <span class=\"xm\">// ?search=alice</span>\n  res.<span class=\"fn\">json</span>(<span class=\"kw\">await</span> db.<span class=\"fn\">findMany</span>({ q }));\n});\n\napp.<span class=\"fn\">get</span>(<span class=\"str\">'/users/:id'</span>, <span class=\"kw\">async</span> (req, res) <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">const</span> user <span class=\"op\">=</span> <span class=\"kw\">await</span> db.<span class=\"fn\">find</span>(req.params.id);\n  <span class=\"kw\">if</span> (!user) <span class=\"kw\">return</span> res.<span class=\"fn\">status</span>(<span class=\"nm\">404</span>)\n    .<span class=\"fn\">json</span>({ error: <span class=\"str\">'Not found'</span> });\n  res.<span class=\"fn\">json</span>(user);\n});\n\napp.<span class=\"fn\">post</span>(<span class=\"str\">'/users'</span>, <span class=\"kw\">async</span> (req, res) <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">const</span> { name, email } <span class=\"op\">=</span> req.body;\n  <span class=\"kw\">if</span> (!name) <span class=\"kw\">return</span> res.<span class=\"fn\">status</span>(<span class=\"nm\">400</span>)\n    .<span class=\"fn\">json</span>({ error: <span class=\"str\">'name required'</span> });\n  <span class=\"kw\">const</span> user <span class=\"op\">=</span> <span class=\"kw\">await</span> db.<span class=\"fn\">create</span>({ name, email });\n  res.<span class=\"fn\">status</span>(<span class=\"nm\">201</span>).<span class=\"fn\">json</span>(user);\n});\n\napp.<span class=\"fn\">patch</span>(<span class=\"str\">'/users/:id'</span>, <span class=\"kw\">async</span> (req, res) <span class=\"op\">=&gt;</span>\n  res.<span class=\"fn\">json</span>(<span class=\"kw\">await</span> db.<span class=\"fn\">update</span>(req.params.id, req.body))\n);\n\napp.<span class=\"fn\">delete</span>(<span class=\"str\">'/users/:id'</span>, <span class=\"kw\">async</span> (req, res) <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">await</span> db.<span class=\"fn\">delete</span>(req.params.id);\n  res.<span class=\"fn\">sendStatus</span>(<span class=\"nm\">204</span>); <span class=\"xm\">// No Content</span>\n});",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is CRUD?</div><div class=\"et\"><div class=\"analogy\"><strong>📖 CRUD = the 4 database operations:</strong><br>— <strong>C</strong>reate → POST<br>— <strong>R</strong>ead → GET<br>— <strong>U</strong>pdate → PUT (replace all) / PATCH (partial update)<br>— <strong>D</strong>elete → DELETE<br><br>REST APIs map these to HTTP methods + URLs. <code>GET /users</code> = \"give me all users.\" <code>DELETE /users/42</code> = \"delete user 42.\"</div></div></div>\n<div class=\"es\"><div class=\"el\">three ways to get request data</div><div class=\"et\"><ul><li><strong><code>req.params.id</code></strong> — the <code>:id</code> in the path. <code>/users/42</code> gives <code>params.id === \"42\"</code> (always a string!)</li><li><strong><code>req.body</code></strong> — JSON in POST/PUT/PATCH body. Requires <code>express.json()</code>.</li><li><strong><code>req.query.search</code></strong> — the <code>?key=value</code> part of the URL. Also always a string.</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">HTTP status codes — use them correctly</div><div class=\"et\"><ul><li><code>200</code> — OK (default for GET, PATCH)</li><li><code>201</code> — Created (successful POST)</li><li><code>204</code> — No Content (DELETE success, empty body)</li><li><code>400</code> — Bad Request (client sent invalid data)</li><li><code>401</code> — Unauthorized (not logged in)</li><li><code>403</code> — Forbidden (logged in, no permission)</li><li><code>404</code> — Not Found</li><li><code>500</code> — Server Error</li></ul><div class=\"tip\"><strong>💡 401 vs 403:</strong> 401 = \"I don't know who you are.\" 403 = \"I know who you are, but you can't do this.\" Classic mix-up.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-23",
    "tab": "express",
    "keywords": "middleware auth next function global specific requireAuth jwt token verify bearer authorization",
    "number": "00000011",
    "title": "MIDDLEWARE & AUTH",
    "tags": [
      "MIDDLEWARE",
      "JWT",
      "AUTH"
    ],
    "codeHtml": "<span class=\"xm\">// Middleware = fn(req, res, next)</span>\n<span class=\"xm\">// MUST call next() OR send a response</span>\napp.<span class=\"fn\">use</span>((req, res, next) <span class=\"op\">=&gt;</span> {\n  console.<span class=\"fn\">log</span>(<span class=\"str\">`${req.method} ${req.url}`</span>);\n  <span class=\"fn\">next</span>(); <span class=\"xm\">// pass to next handler</span>\n});\n\n<span class=\"kw\">function</span> <span class=\"fn\">requireAuth</span>(req, res, next) {\n  <span class=\"kw\">const</span> token <span class=\"op\">=</span>\n    req.headers.authorization<span class=\"op\">?.</span><span class=\"fn\">split</span>(<span class=\"str\">' '</span>)[<span class=\"nm\">1</span>];\n  <span class=\"kw\">if</span> (!token) <span class=\"kw\">return</span> res.<span class=\"fn\">status</span>(<span class=\"nm\">401</span>)\n    .<span class=\"fn\">json</span>({ error: <span class=\"str\">'No token'</span> });\n  <span class=\"kw\">try</span> {\n    req.user <span class=\"op\">=</span> jwt.<span class=\"fn\">verify</span>(token, SECRET);\n    <span class=\"fn\">next</span>();\n  } <span class=\"kw\">catch</span> {\n    res.<span class=\"fn\">status</span>(<span class=\"nm\">401</span>).<span class=\"fn\">json</span>({ error: <span class=\"str\">'Invalid'</span> });\n  }\n}\n\napp.<span class=\"fn\">get</span>(<span class=\"str\">'/profile'</span>, requireAuth, handler);\napp.<span class=\"fn\">use</span>(<span class=\"str\">'/admin'</span>, requireAuth); <span class=\"xm\">// all /admin/*</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">what is middleware?</div><div class=\"et\"><div class=\"analogy\"><strong>🚪 Middleware is a security checkpoint every request passes through</strong> before reaching its destination. Like airport security — every passenger (request) goes through the same scanning process regardless of their destination. Each middleware can inspect, modify, or reject the request.</div>Middleware functions have three parameters: <code>req</code>, <code>res</code>, and <code>next</code> (a function to call to pass control forward).</div></div>\n<div class=\"es\"><div class=\"el\">the golden rule</div><div class=\"et\"><div class=\"gotcha\"><strong>⚠ Every middleware must either call next() or send a response.</strong> Forgetting to call <code>next()</code> causes the request to hang forever — the client spins indefinitely waiting for a response that never comes. This is one of the most common Express bugs.</div></div></div>\n<div class=\"es\"><div class=\"el\">JWT auth flow explained</div><div class=\"et\"><strong>How JWT login works step by step:</strong><ol><li>User sends email + password to <code>POST /auth/login</code></li><li>Server verifies credentials in the database</li><li>Server creates a JWT containing the user's ID (signed with a secret key)</li><li>Server sends the token back to the client</li><li>Client stores the token (localStorage or HttpOnly cookie)</li><li>Client includes <code>Authorization: Bearer &lt;token&gt;</code> on future requests</li><li><code>requireAuth</code> middleware extracts and verifies the token on every protected route</li></ol><div class=\"tip\"><strong>💡</strong> The JWT secret must be long, random, in an env variable. Never hardcode it. Never commit <code>.env</code> to Git.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-24",
    "tab": "express",
    "keywords": "router modular files prefix mount error handler global async wrapper cors dotenv env 4 params",
    "number": "00000100",
    "title": "ROUTER, ERRORS & CORS",
    "tags": [
      "ROUTER",
      "ERRORS",
      "CORS"
    ],
    "codeHtml": "<span class=\"xm\">// routes/users.ts — grouped by feature</span>\n<span class=\"kw\">import</span> { Router } <span class=\"kw\">from</span> <span class=\"str\">'express'</span>;\n<span class=\"kw\">const</span> router <span class=\"op\">=</span> <span class=\"fn\">Router</span>();\nrouter.<span class=\"fn\">get</span>(<span class=\"str\">'/'</span>,    getAllUsers);\nrouter.<span class=\"fn\">post</span>(<span class=\"str\">'/'</span>,   createUser);\nrouter.<span class=\"fn\">get</span>(<span class=\"str\">'/:id'</span>, getById);\n<span class=\"kw\">export default</span> router;\n\n<span class=\"xm\">// app.ts — mount with prefix</span>\napp.<span class=\"fn\">use</span>(<span class=\"str\">'/api/users'</span>, usersRouter);\n\n<span class=\"xm\">// Async wrapper — auto-forward errors</span>\n<span class=\"kw\">const</span> ac <span class=\"op\">=</span> fn <span class=\"op\">=&gt;</span> (req, res, next) <span class=\"op\">=&gt;</span>\n  Promise.<span class=\"fn\">resolve</span>(<span class=\"fn\">fn</span>(req,res,next)).<span class=\"fn\">catch</span>(next);\n\napp.<span class=\"fn\">get</span>(<span class=\"str\">'/data'</span>, <span class=\"fn\">ac</span>(<span class=\"kw\">async</span> (req, res) <span class=\"op\">=&gt;</span> {\n  <span class=\"kw\">const</span> d <span class=\"op\">=</span> <span class=\"kw\">await</span> <span class=\"fn\">riskyOp</span>(); <span class=\"xm\">// throws → caught</span>\n  res.<span class=\"fn\">json</span>(d);\n}));\n\n<span class=\"xm\">// Global error handler — 4 args, LAST!</span>\napp.<span class=\"fn\">use</span>((err, req, res, next) <span class=\"op\">=&gt;</span> {\n  res.<span class=\"fn\">status</span>(err.status <span class=\"op\">||</span> <span class=\"nm\">500</span>)\n    .<span class=\"fn\">json</span>({ error: err.message });\n});\n\n<span class=\"xm\">// CORS</span>\n<span class=\"kw\">import</span> cors <span class=\"kw\">from</span> <span class=\"str\">'cors'</span>;\napp.<span class=\"fn\">use</span>(<span class=\"fn\">cors</span>({ origin: process.env.CLIENT_URL }));",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">why use Router?</div><div class=\"et\"><div class=\"analogy\"><strong>📁 Imagine all code for a hospital in one giant file</strong> — admissions, surgery, pharmacy, accounting. Unmanageable. You split by department. Express Router splits routes into separate files by feature (users, posts, auth).</div>The prefix in <code>app.use(\"/api/users\", usersRouter)</code> auto-prepends to all routes inside. <code>router.get(\"/\")</code> becomes <code>GET /api/users</code> automatically. Never repeat the prefix.</div></div>\n<div class=\"es\"><div class=\"el\">async error handling — critical</div><div class=\"et\">Express only catches errors from synchronous code by default. If an async route throws, Express doesn't know — the request hangs forever.<br><br>The <code>ac</code> wrapper wraps async handlers in a Promise and calls <code>next(err)</code> if it rejects — forwarding to your global error handler.<br><br>The global error handler is recognised by Express because it has <strong>4 parameters</strong>. It must be the <strong>very last</strong> <code>app.use()</code> call.</div></div>\n<div class=\"es\"><div class=\"el\">what is CORS and why?</div><div class=\"et\"><div class=\"analogy\"><strong>🔒 CORS = Cross-Origin Resource Sharing.</strong> By default, browsers block your React app (port 5173) from fetching data from Express (port 3000) because they're on different \"origins.\" This is a browser security feature — the server must explicitly say \"yes, that origin is allowed.\"</div>The <code>cors</code> npm package adds the right headers. Always configure a specific <code>origin</code> — don't use <code>cors()</code> with no config in production (that allows every origin, including attackers).</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-25",
    "tab": "next",
    "keywords": "nextjs file routing pages structure folder app router special files layout loading error not-found group dynamic",
    "number": "00000001",
    "title": "FILE-BASED ROUTING",
    "tags": [
      "ROUTING",
      "STRUCTURE",
      "FOLDERS"
    ],
    "codeHtml": "app/\n├── layout.tsx      <span class=\"xm\">← root layout (required)</span>\n├── page.tsx        <span class=\"xm\">← /</span>\n├── loading.tsx     <span class=\"xm\">← Suspense fallback</span>\n├── error.tsx       <span class=\"xm\">← error boundary</span>\n├── not-found.tsx   <span class=\"xm\">← 404 page</span>\n├── about/\n│   └── page.tsx    <span class=\"xm\">← /about</span>\n├── blog/\n│   ├── page.tsx    <span class=\"xm\">← /blog</span>\n│   └── [slug]/\n│       └── page.tsx <span class=\"xm\">← /blog/:slug</span>\n├── (auth)/         <span class=\"xm\">← group (NOT in URL)</span>\n│   ├── login/\n│   │   └── page.tsx <span class=\"xm\">← /login</span>\n│   └── layout.tsx  <span class=\"xm\">← auth-only layout</span>\n└── api/\n    └── users/\n        └── route.ts <span class=\"xm\">← /api/users</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">the big idea</div><div class=\"et\"><div class=\"analogy\"><strong>📂 In regular React, you write routing code:</strong> <code>&lt;Route path=\"/blog/:slug\" element={...}&gt;</code>.<br><br><strong>In Next.js, you create a folder.</strong> The folder path IS the URL. Creating <code>app/blog/[slug]/page.tsx</code> automatically creates the route <code>/blog/:slug</code>. Zero router configuration.</div></div></div>\n<div class=\"es\"><div class=\"el\">special filenames</div><div class=\"et\"><ul><li><code>page.tsx</code> — renders at that URL. Required to make a route accessible.</li><li><code>layout.tsx</code> — wraps the page and all children. Persists across navigation (doesn't re-mount when navigating between pages in the same layout).</li><li><code>loading.tsx</code> — shown automatically while async data loads (React Suspense boundary).</li><li><code>error.tsx</code> — shown if the page throws (must have <code>'use client'</code>).</li><li><code>not-found.tsx</code> — your 404. Show programmatically with <code>notFound()</code>.</li><li><code>route.ts</code> — API endpoint (no UI). Export GET, POST, etc.</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">dynamic routes and route groups</div><div class=\"et\"><strong><code>[slug]</code></strong> — square brackets create dynamic segments. The value is passed as <code>params.slug</code> to the page.<br><br><strong><code>(auth)</code></strong> — parentheses create route groups. The folder name is ignored in the URL — purely organisational. Use it to apply a specific layout to a subset of routes without affecting the URL structure.</div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-26",
    "tab": "next",
    "keywords": "server client component use client RSC async db access hooks events browser useState useEffect",
    "number": "00000010",
    "title": "SERVER vs CLIENT COMPONENTS",
    "tags": [
      "RSC",
      "USE CLIENT",
      "RENDERING"
    ],
    "codeHtml": "<span class=\"xm\">// SERVER — default. Runs on server ONLY.</span>\n<span class=\"xm\">// ✅ async, DB, secrets, no JS bundle size</span>\n<span class=\"xm\">// ❌ no useState, useEffect, onClick</span>\n<span class=\"kw\">async function</span> <span class=\"fn\">ProductList</span>() {\n  <span class=\"kw\">const</span> products <span class=\"op\">=</span> <span class=\"kw\">await</span>\n    prisma.product.<span class=\"fn\">findMany</span>();\n  <span class=\"kw\">return</span> <span class=\"tg\"><ul>\n    <span class=\"op\">{products.<span class=\"fn\">map</span>(p <span class=\"op\">=&gt;</span>\n      <span class=\"tg\"><li< span=\"\"> <span class=\"fn\">key</span><span class=\"op\">={p.id}&gt;<span class=\"op\">{p.name}</span><span class=\"tg\"></span>\n    )}</span>\n  <span class=\"tg\"></span></li<></span></span></ul></span>;\n}\n\n<span class=\"xm\">// CLIENT — add 'use client' at top of file</span>\n<span class=\"xm\">// ✅ useState, events, browser APIs</span>\n<span class=\"xm\">// ❌ can't query DB, secrets leak to browser</span>\n<span class=\"str\">'use client'</span>;\n<span class=\"kw\">import</span> { useState } <span class=\"kw\">from</span> <span class=\"str\">'react'</span>;\n\n<span class=\"kw\">export function</span> <span class=\"fn\">LikeButton</span>({ id }) {\n  <span class=\"kw\">const</span> [liked, setLiked] <span class=\"op\">=</span> <span class=\"fn\">useState</span>(<span class=\"kw\">false</span>);\n  <span class=\"kw\">return</span> <span class=\"tg\"><button< span=\"\"> <span class=\"fn\">onClick</span><span class=\"op\">={() =&gt;</span>\n    <span class=\"fn\">setLiked</span>(!liked)<span class=\"op\">}&gt;</span>\n    <span class=\"op\">{liked ?</span> <span class=\"str\">'❤️'</span> <span class=\"op\">:</span> <span class=\"str\">'🤍'</span><span class=\"op\">}</span>\n  <span class=\"tg\"></span>;\n}</button<></span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">this is Next.js's biggest idea</div><div class=\"et\"><div class=\"analogy\"><strong>⚖️ Think of your app like a restaurant.</strong> The kitchen (server components) does all the heavy work — gathering ingredients, preparing food — before anyone sees anything. The front of house (client components) handles real-time interaction with the customer. You want as much work as possible in the kitchen, and only the interactive parts up front.</div></div></div>\n<div class=\"es\"><div class=\"el\">server components — the default</div><div class=\"et\">Every component in Next.js is a Server Component by default. They:<ul><li>Run on the server, never in the browser</li><li>Can be <code>async</code> — directly await database queries, APIs, file reads</li><li>Access server-side secrets (env vars, API keys)</li><li>Add no JavaScript to the browser bundle — faster page loads</li><li>Cannot use hooks, click handlers, or browser-specific APIs</li></ul></div></div>\n<div class=\"es\"><div class=\"el\">client components — opt in with 'use client'</div><div class=\"et\">Add <code>'use client'</code> at the very top of a file. This means:<ul><li>Can use all React hooks: useState, useEffect, useRef, etc.</li><li>Can respond to events: onClick, onChange</li><li>Runs in the browser (also server-pre-renders for initial HTML)</li><li>Cannot directly query a database (code ships to browser)</li></ul><div class=\"tip\"><strong>💡 Golden rule:</strong> Start as Server Component. Add 'use client' only when you need interactivity, hooks, or browser APIs. Keep client components small, push them to leaves of the tree.</div></div></div>",
    "exercise": {
      "question": "By default, what type of component is created in the Next.js App Router?",
      "options": [
        "A Client Component",
        "A Server Component",
        "A Static Component",
        "A Hybrid Component"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-27",
    "tab": "next",
    "keywords": "data fetching fetch cache no-store revalidate ISR static dynamic prisma db direct access",
    "number": "00000011",
    "title": "DATA FETCHING & CACHING",
    "tags": [
      "FETCH",
      "CACHE",
      "ISR"
    ],
    "codeHtml": "<span class=\"kw\">async function</span> <span class=\"fn\">Page</span>() {\n  <span class=\"xm\">// Static — cached at build time (fastest)</span>\n  <span class=\"kw\">const</span> r1 <span class=\"op\">=</span> <span class=\"kw\">await</span> <span class=\"fn\">fetch</span>(url);\n\n  <span class=\"xm\">// Dynamic — fresh on every request</span>\n  <span class=\"kw\">const</span> r2 <span class=\"op\">=</span> <span class=\"kw\">await</span> <span class=\"fn\">fetch</span>(url, {\n    cache: <span class=\"str\">'no-store'</span>\n  });\n\n  <span class=\"xm\">// ISR — stale-while-revalidate</span>\n  <span class=\"kw\">const</span> r3 <span class=\"op\">=</span> <span class=\"kw\">await</span> <span class=\"fn\">fetch</span>(url, {\n    next: { revalidate: <span class=\"nm\">60</span> } <span class=\"xm\">// rebuild every 60s</span>\n  });\n\n  <span class=\"xm\">// Direct DB — server component only!</span>\n  <span class=\"kw\">const</span> users <span class=\"op\">=</span> <span class=\"kw\">await</span> prisma.user.<span class=\"fn\">findMany</span>();\n\n  <span class=\"kw\">const</span> data <span class=\"op\">=</span> <span class=\"kw\">await</span> r1.<span class=\"fn\">json</span>();\n  <span class=\"kw\">return</span> <span class=\"tg\"><div><span class=\"op\">{data.title}</span><span class=\"tg\"></span></div></span>;\n}\n\n<span class=\"xm\">// Force rendering mode for whole page</span>\n<span class=\"kw\">export const</span> dynamic    <span class=\"op\">=</span> <span class=\"str\">'force-dynamic'</span>;\n<span class=\"kw\">export const</span> revalidate <span class=\"op\">=</span> <span class=\"nm\">3600</span>;",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">three fetching strategies</div><div class=\"et\"><div class=\"analogy\"><strong>📰 Think of a news website:</strong><br>— <strong>Static</strong> = Print a million copies at press time. Everyone gets the same paper (fastest, cheapest). For rarely-changing content: docs, marketing pages.<br>— <strong>Dynamic (no-store)</strong> = Print a fresh paper for every reader. For real-time data: stock prices, user dashboards.<br>— <strong>ISR (revalidate: 60)</strong> = Print at press time, reprint hourly in the background. Readers get fast delivery, data is fresh enough. Best for most apps: blogs, product listings.</div></div></div>\n<div class=\"es\"><div class=\"el\">how Next.js extends fetch</div><div class=\"et\">Next.js overrides the built-in <code>fetch</code> globally to add caching. The <code>cache</code> and <code>next</code> properties are Next.js additions. Multiple <code>fetch</code> calls to the same URL within one request are automatically deduplicated — only one actual network request even if multiple components ask for the same data.</div></div>\n<div class=\"es\"><div class=\"el\">direct DB access is a superpower</div><div class=\"et\">Because Server Components run on the server, you can import Prisma and query the database directly in your component — no API route needed. The query runs server-side, data renders into HTML, and that's what the browser gets. The database query never reaches the browser.<br><br><div class=\"tip\"><strong>💡 When do you still need API routes?</strong> When exposing data to external clients (mobile apps, third parties) or when doing mutations without Server Actions.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-28",
    "tab": "next",
    "keywords": "server actions form action use server mutation revalidatePath redirect formData API route GET POST",
    "number": "00000100",
    "title": "SERVER ACTIONS & API ROUTES",
    "tags": [
      "ACTIONS",
      "API",
      "MUTATIONS"
    ],
    "codeHtml": "<span class=\"xm\">// API Route — app/api/users/route.ts</span>\n<span class=\"kw\">import</span> { NextRequest, NextResponse }\n  <span class=\"kw\">from</span> <span class=\"str\">'next/server'</span>;\n\n<span class=\"kw\">export async function</span> <span class=\"fn\">GET</span>(req<span class=\"op\">:</span> NextRequest) {\n  <span class=\"kw\">const</span> users <span class=\"op\">=</span> <span class=\"kw\">await</span> db.<span class=\"fn\">findMany</span>();\n  <span class=\"kw\">return</span> NextResponse.<span class=\"fn\">json</span>(users);\n}\n<span class=\"kw\">export async function</span> <span class=\"fn\">POST</span>(req<span class=\"op\">:</span> NextRequest) {\n  <span class=\"kw\">const</span> body <span class=\"op\">=</span> <span class=\"kw\">await</span> req.<span class=\"fn\">json</span>();\n  <span class=\"kw\">return</span> NextResponse.<span class=\"fn\">json</span>(\n    <span class=\"kw\">await</span> db.<span class=\"fn\">create</span>(body), { status: <span class=\"nm\">201</span> }\n  );\n}\n\n<span class=\"xm\">// Server Action — skip API entirely!</span>\n<span class=\"str\">'use server'</span>;\n<span class=\"kw\">import</span> { revalidatePath } <span class=\"kw\">from</span> <span class=\"str\">'next/cache'</span>;\n<span class=\"kw\">import</span> { redirect }       <span class=\"kw\">from</span> <span class=\"str\">'next/navigation'</span>;\n\n<span class=\"kw\">export async function</span> <span class=\"fn\">createPost</span>(fd<span class=\"op\">:</span> FormData) {\n  <span class=\"kw\">await</span> db.post.<span class=\"fn\">create</span>({\n    data: {\n      title: fd.<span class=\"fn\">get</span>(<span class=\"str\">'title'</span>) <span class=\"kw\">as</span> <span class=\"tp\">string</span>,\n    }\n  });\n  <span class=\"fn\">revalidatePath</span>(<span class=\"str\">'/blog'</span>);\n  <span class=\"fn\">redirect</span>(<span class=\"str\">'/blog'</span>);\n}\n<span class=\"xm\">// Use: &lt;form action={createPost}&gt;</span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">API routes — Next.js is its own backend</div><div class=\"et\">You don't need a separate Express server for most Next.js apps. <code>route.ts</code> files in <code>app/api/</code> are your backend endpoints. Export functions named after HTTP verbs: <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>. They run server-side — you can query databases directly.</div></div>\n<div class=\"es\"><div class=\"el\">server actions — skip the API layer</div><div class=\"et\"><div class=\"analogy\"><strong>⚡ Without Server Actions:</strong> Create API route → write fetch() in frontend → handle loading state → handle errors in both places → 4 files for one feature.<br><br><strong>With Server Actions:</strong> Write one async function with <code>'use server'</code> → pass it to the form's <code>action</code> prop → done. One file, no explicit fetch, no API route.</div></div></div>\n<div class=\"es\"><div class=\"el\">revalidatePath and redirect</div><div class=\"et\"><strong><code>revalidatePath(\"/blog\")</code></strong> — clears the cache for that URL. Next time someone visits <code>/blog</code>, fresh data is fetched instead of the stale cached version. Essential after any mutation.<br><br><strong><code>redirect(\"/blog\")</code></strong> — sends the user to a new page. It works by throwing a special error internally. <div class=\"gotcha\"><strong>⚠ Don't put redirect() inside a try/catch block</strong> — the catch will intercept the special error and prevent the redirect.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  },
  {
    "id": "card-29",
    "tab": "next",
    "keywords": "next link navigate image useRouter usePathname prefetch middleware edge redirect cookie auth",
    "number": "00000101",
    "title": "NAVIGATION, IMAGE & MIDDLEWARE",
    "tags": [
      "LINK",
      "IMAGE",
      "MIDDLEWARE"
    ],
    "codeHtml": "<span class=\"kw\">import</span> Link  <span class=\"kw\">from</span> <span class=\"str\">'next/link'</span>;\n<span class=\"kw\">import</span> Image <span class=\"kw\">from</span> <span class=\"str\">'next/image'</span>;\n\n<span class=\"xm\">// Always use Link — prefetches, no reload</span>\n<span class=\"tg\"><link< span=\"\"> <span class=\"fn\">href</span><span class=\"op\">=<span class=\"str\">'/about'</span><span class=\"tg\">&gt;About</span>\n\n<span class=\"xm\">// Optimised image — auto WebP + lazy load</span>\n<span class=\"tg\"><image< span=\"\">\n  <span class=\"fn\">src</span><span class=\"op\">=<span class=\"str\">'/hero.jpg'</span>\n  <span class=\"fn\">width</span><span class=\"op\">={1200} <span class=\"fn\">height</span><span class=\"op\">={630}\n  <span class=\"fn\">alt</span><span class=\"op\">=<span class=\"str\">'Hero'</span>\n  <span class=\"fn\">priority</span> <span class=\"xm\">{/* eager-load LCP image */}</span>\n<span class=\"tg\">/&gt;</span>\n\n<span class=\"xm\">// Client-side nav (in 'use client' components)</span>\n<span class=\"kw\">const</span> router <span class=\"op\">=</span> <span class=\"fn\">useRouter</span>();\nrouter.<span class=\"fn\">push</span>(<span class=\"str\">'/dashboard'</span>);\nrouter.<span class=\"fn\">replace</span>(<span class=\"str\">'/login'</span>);\n\n<span class=\"xm\">// middleware.ts — runs on Edge, before all requests</span>\n<span class=\"kw\">export function</span> <span class=\"fn\">middleware</span>(req) {\n  <span class=\"kw\">const</span> token <span class=\"op\">=</span> req.cookies.<span class=\"fn\">get</span>(<span class=\"str\">'token'</span>);\n  <span class=\"kw\">if</span> (!token <span class=\"op\">&amp;&amp;</span>\n    req.nextUrl.pathname.<span class=\"fn\">startsWith</span>(<span class=\"str\">'/dash'</span>))\n    <span class=\"kw\">return</span> NextResponse.<span class=\"fn\">redirect</span>(\n      <span class=\"kw\">new</span> <span class=\"fn\">URL</span>(<span class=\"str\">'/login'</span>, req.url));\n}\n<span class=\"kw\">export const</span> config <span class=\"op\">=</span> {\n  matcher: [<span class=\"str\">'/dash/:path*'</span>]\n};</span></span></span></span></image<></span></span></link<></span>",
    "explanationsHtml": "<div class=\"es\"><div class=\"el\">Link — not just a convenience</div><div class=\"et\"><div class=\"gotcha\"><strong>⚠ Never use a plain &lt;a href&gt; for internal navigation.</strong> A plain anchor causes a full browser reload — all React state destroyed, all JS re-downloaded, page flashes. Terrible UX.</div>Next.js <code>&lt;Link&gt;</code> navigates client-side — no reload, state preserved, instant. It also automatically prefetches destination pages when the link enters the viewport.</div></div>\n<div class=\"es\"><div class=\"el\">Image component — automatic optimization</div><div class=\"et\">The <code>&lt;Image&gt;</code> component automatically:<ul><li>Converts images to <strong>WebP</strong> (smaller file size)</li><li>Serves the <strong>right size</strong> for each device (no 4K image on mobile)</li><li><strong>Lazy-loads</strong> — only downloads when about to be visible</li><li>Prevents <strong>layout shift</strong> — reserves space while loading</li></ul>Add <code>priority</code> to hero/banner images (largest above-the-fold image) to eager-load them instead.</div></div>\n<div class=\"es\"><div class=\"el\">middleware — the edge gatekeeper</div><div class=\"et\"><code>middleware.ts</code> runs on Vercel's Edge Network — servers geographically close to your users — before every request reaches pages or API routes. Ideal for auth redirects because it's incredibly fast and the redirect happens before any page code runs.<br><br><div class=\"tip\"><strong>💡 Keep middleware lean.</strong> No database queries, no heavy computation. Only fast checks: cookies, headers, pathname matching. The <code>matcher</code> config limits which paths trigger it — crucial for performance.</div></div></div>",
    "exercise": {
      "question": "What is the primary purpose of this feature?",
      "options": [
        "Performance optimization",
        "Code readability",
        "Memory management",
        "Error handling"
      ],
      "correctAnswerIndex": 1
    }
  }
];
