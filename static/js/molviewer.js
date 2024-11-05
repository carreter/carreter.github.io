let stage = undefined;
$( document ).ready(() => {
    // Set up the viewer
    let element = $('#hai');
    console.log(element);
    var schemeId = NGL.ColormakerRegistry.addSelectionScheme( [
        [ "#55CDFC", "306-395" ],
        [ "#F7A8B8", "396-494" ],
    ], "Transmembrane 1a52" );
    stage = new NGL.Stage(element, {backgroundColor: "#ebebeb"});
    stage.loadFile('./1a52.pdb').then((o) => {
        o.addRepresentation( "cartoon", {scale: 1, color: schemeId } );
        stage.autoView()
        stage.mouseControls.remove("*")
        stage.setSpin(true)
        stage.handleResize()
    })
});

$( window ).resize(() => {
    stage.handleResize()
})
