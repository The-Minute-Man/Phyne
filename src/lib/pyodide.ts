export interface PyodideInterface {
  runPython: (code: string) => any;
  loadPackage: (names: string | string[]) => Promise<void>;
}

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
    pyodideInstance?: PyodideInterface | null;
    pyodideLoadingPromise?: Promise<PyodideInterface>;
  }
}

export async function getPyodide(): Promise<PyodideInterface> {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide can only be loaded in the browser');
  }

  // If already loaded, return it
  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  // If already loading, wait for it
  if (window.pyodideLoadingPromise) {
    return window.pyodideLoadingPromise;
  }

  window.pyodideLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
    script.onload = async () => {
      try {
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
        });
        await pyodide.loadPackage('sympy');
        
        // Define a python helper function to evaluate math expressions safely
        pyodide.runPython(`
import sympy
def check_equivalence(user_expr_str, correct_expr_str):
    try:
        user_expr = sympy.sympify(user_expr_str)
        correct_expr = sympy.sympify(correct_expr_str)
        diff = sympy.simplify(user_expr - correct_expr)
        return bool(diff == 0)
    except Exception as e:
        return "ERROR:" + str(e)

def get_latex(user_expr_str):
    if not user_expr_str.strip():
        return ""
    try:
        # evaluate=False prevents SymPy from automatically simplifying things like 2/4 to 1/2 before rendering
        user_expr = sympy.sympify(user_expr_str, evaluate=False)
        return sympy.latex(user_expr)
    except Exception:
        return ""
        `);
        
        window.pyodideInstance = pyodide;
        resolve(pyodide);
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Pyodide script'));
    };
    document.head.appendChild(script);
  });

  return window.pyodideLoadingPromise;
}

/**
 * Checks if two math expressions are algebraically equivalent using SymPy.
 * Returns true if equivalent, false if not, or an error string if syntax is invalid.
 */
export async function checkEquivalenceSympy(userExpr: string, correctExpr: string): Promise<boolean | string> {
  const pyodide = await getPyodide();
  // We call the python helper function we defined during initialization
  const checkFunc = pyodide.runPython('check_equivalence');
  const result = checkFunc(userExpr, correctExpr);
  return result; 
}

/**
 * Converts a mathematical expression string to a LaTeX string using SymPy.
 * Returns an empty string if the expression is invalid or empty.
 */
export async function getLatexSympy(expr: string): Promise<string> {
  if (!expr.trim()) return '';
  const pyodide = await getPyodide();
  const latexFunc = pyodide.runPython('get_latex');
  return latexFunc(expr);
}
