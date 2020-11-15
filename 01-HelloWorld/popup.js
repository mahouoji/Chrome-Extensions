window.onload = function(){
    var name = document.getElementById('name');
    name.addEventListener('keyup', function() {
        document.getElementById('greet').textContent = 'Hello ' + name.value;
    });
}