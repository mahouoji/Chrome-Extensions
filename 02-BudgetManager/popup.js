window.onload = function(){
    var total = document.getElementById('total');
    var limit = document.getElementById('limit');

    chrome.storage.sync.get(['total','limit'],function(budget){
        total.textContent = budget.total;
        limit.textContent = budget.limit;
    });

    document.getElementById('spendAmount').addEventListener('click', function(){
        chrome.storage.sync.get(['total', 'limit'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = document.getElementById('amount').value;
            if (amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){               
                if (amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your alloted limit."
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });
            total.textContent = newTotal;
            amount.value = '';
        });
    });
};