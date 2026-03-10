let jedison;

async function init() {
    const holder = document.querySelector('#editor_holder');
    
    try {
        const response = await fetch('/config/schema_dk.json');
        const schema = await response.json();

        if (schema.description) {
            document.getElementById('main-description').textContent = schema.description;
        }

        // Replicating the official doc pattern
        jedison = new Jedison.Create({
            container: holder,
            // MUST match the CSS version in your HTML
            theme: new Jedison.ThemeBootstrap5(), 
            iconLib: 'bootstrap-icons',
            btnContents: false,
            schema: schema // Ensure x-format is inside your JSON file
        });

    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

document.getElementById('submit-btn').onclick = () => {
    const data = jedison.getValue();
    console.log(data);
    // ... your export logic
};

init();