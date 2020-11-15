window.onload = function(){
    var limit = document.getElementById('limit');
    chrome.storage.sync.get('limit',function(budget){
        limit.value = budget.limit;
    });

    document.getElementById('saveLimit').addEventListener('click', function(){
        var limitVal = limit.value;
        if (limitVal){
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            });
        }
    });
    document.getElementById('resetTotal').addEventListener('click', function(){
        chrome.storage.sync.set({'total': 0}, function(){
            var notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Resetting Total",
                message: "Total has been reset to 0."
            };
            chrome.notifications.create('resetNotif', notifOptions);
        });
    });
};