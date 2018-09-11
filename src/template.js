module.exports = data =>`<!DOCTYPE html>
    <html>
    <head>
    <title>SSE Example</title>
    <meta charset="UTF-8">
    <script type="text/javascript">
        window.onload = () => {
            const eventSource = new EventSource('http://localhost:3000/sse/${data.id}');
            const status = document.getElementById("status");
        
            eventSource.addEventListener('connected', (e) => {
                status.innerHTML = "Connected to server";
                console.info(e.data);
            });
    
            eventSource.addEventListener('done', (e) => {
                const data = JSON.parse(e.data);
                status.innerHTML = \`Job done! Result is "\${data.result}"\`;
                eventSource.close();
            });
    
            eventSource.addEventListener('error', (e) => {
                console.error(e.data);
                status.innerHTML = "Error occured";
                eventSource.close();
            });
        }
    </script>
    </head>
    <body>

    <p id="status">Your request is ${data.status}.</p>

    </body>
</html>
`