let jedison;

async function init() {
    const holder = document.querySelector('#editor_holder');
    
    try {
        // Relativ sti til GitHub Pages (./config/...)
        const response = await fetch('./config/schema_dk.json');
        const schema = await response.json();

        if (schema.description) {
            document.getElementById('main-description').textContent = schema.description;
        }

        jedison = new Jedison.Create({
            container: holder,
            theme: new Jedison.ThemeBootstrap5(), 
            iconLib: 'bootstrap-icons',
            btnContents: false,
            schema: schema 
        });

    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

document.getElementById('submit-btn').onclick = () => {
    if (!jedison) return;

    // Vi bruger getValue(), da konsollen bekræftede, at det er her data ligger
    const data = jedison.getValue();
    console.log("Eksporterer data:", data);

    // Download logik
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = 'os2_governance_besvarelse.json';
    document.body.appendChild(a);
    a.click();
    
    // Ryd op i DOM og hukommelse
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
};

init();