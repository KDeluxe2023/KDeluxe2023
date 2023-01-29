{
console.log("[KDeluxe] Fred Dumper Loaded...");
const performanceFredDumper = performance.now();
const $post = $('.post').first();
const $postInfo = $post.find('.postInfo').first();
$postInfo.prepend('<span id="dumper_container">[<a href="#" id="dump_thread"><i class="fa fa-download" aria-hidden="true"></i></a>]</span>');
$("#dumper_container").css({ marginRight: "3px" });

$("#dump_thread").click(function(e) {
    e.preventDefault();
    dialogBox('KDeluxe', 'Jak chcesz pobrać ten temat?', ["Screenshot", "Screenshot + Pliki", "Tylko Pliki", "Anuluj"], 'fa-download', function(a) {
        if (a === 3) return;

        const fredId = $postInfo.attr("id").replace(/\D/g, '');
        const fredTime = $postInfo.find(".dateTime").attr("title");

        if (a === 2) {
            downloadAllMediaZipped();
            return;
        }

        const fredHeight = document.body.scrollHeight;
        if (fredHeight > 32767) {
            dialogBox('KDeluxe', 'Ten fred przekracza 32,000px wysokości i nie może zostać zeskrinowany', ['OK'], 'fa-exclamation-triangle');
            return;
        }

        function downloadAllMediaZipped() {
            function saveToZip(name, urls) {
                console.log("Generating zip...");
                const zip = new JSZip();
                const folder = zip.folder("project");
                urls.forEach(url => {
                    const file = fetch(url)
                        .then(res => (res.status === 200 ? res.blob() : Promise.reject(new Error(res.statusText))))
                        .then(blob => {
                            const fileName = url.substring(url.lastIndexOf("/"));
                            folder.file(fileName, blob);
                        });
                });
                zip.generateAsync({ type: "blob" })
                    .then(blob => saveAs(blob, name))
                    .catch(err => console.log(err));
            }

            console.log("Creating zip...");
            const urls = [];
            $('.fileThumb').each(function() {
                const link = $(this).attr("href");
                if (!link) return true;
                const absoluteUrl = new URL(link, document.baseURI).href;
                urls.push(absoluteUrl);
            });
            console.log(`[KDeluxe] ${urls.length} links to zip collected`);
            saveToZip(`${fredId} - ${fredTime}.zip`, urls);
        }

        if (a === 0 || a === 1) {
            function downloadURI(uri, name) {
                const link = document.createElement("a");
                link.download = name;
                link.download = name;
                link.href = uri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                delete link;
