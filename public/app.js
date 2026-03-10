/**
 * Project Governance Assessment - 2026 Maintainable Version
 */
let editor;

async function init() {
    const holder = document.getElementById('editor_holder');

    try {
        const response = await fetch('/config/schema.json');
        if (!response.ok) throw new Error(`Schema error: ${response.statusText}`);
        const schema = await response.json();

        if (schema.title) document.title = schema.title;

        holder.innerHTML = '';
        
        editor = new JSONEditor(holder, {
            schema: schema,
            theme: 'html',
            disable_collapse: true,
            disable_edit_json: true,
            disable_properties: true,
            show_errors: 'interaction' 
        });

    } catch (err) {
        holder.innerHTML = `<mark>Initialization Error: ${err.message}</mark>`;
    }
}

document.getElementById('submit-btn').addEventListener('click', () => {
    if (!editor) return;

    const errors = editor.validate();
    if (errors.length > 0) {
        alert("The form is incomplete or contains errors. Please check the highlighted fields.");
        return;
    }

    const data = editor.getValue();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
        href: url,
        download: `assessment-${Date.now()}.json`
    });
    a.click();
    URL.revokeObjectURL(url);
});

init();