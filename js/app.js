// jQuery is a JS library designed to simplify working with the DOM (Document Object Model) and event handling.
// This code runs the function createBugList() only after the DOM has completely loaded, ensuring safe DOM element interaction.
$(document).ready(function () {
    createBugList();
});

// Auto-focus on input of add task modal
$('#add-bug-container').on('shown.bs.modal', function () {
    $('#new-bug').trigger('focus');
});

async function createBugList() {
    try {
        await getAccount();
        contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            let bugNum = await contract.methods.getBugCount().call({
                from: web3.eth.defaultAccount
            });
            if (bugNum != 0) {
                let bugIndex = 0;
                while (bugIndex < bugNum) {
                    try {
                        let bug = await contract.methods.getBug(bugIndex).call({
                            from: web3.eth.defaultAccount
                        });
                        if (bug[0] != '') {
                            addBugToList(bugIndex, bug[0], bug[1], bug[2], bug[3]);
                        } else {
                            console.log('The index is empty: ' + bugIndex);
                        }
                    } catch {
                        console.log('Failed to get bug: ' + bugIndex);
                    }
                    bugIndex++;
                }
            }
        } catch {
            console.log('Failed to retrieve bug count from blockchain.');
        }
    } catch {
        console.log('Failed to retrieve default account from blockchain.');
    }
}

function addBugToList(id, name, bugId, criticality, isResolved) {
    let list = document.getElementById('list');
    let item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'd-flex', 'justify-content-between', 'align-items-center');
    item.id = 'item-' + id;

    let bugDescription = document.createElement('span');
    bugDescription.textContent = 'Bug ID: ' + bugId + ' | Description: ' + name +
        ' | Criticality: ' + getCriticalityLabel(criticality.toString()) +
        ' | Resolved: ' + (isResolved ? 'Yes' : 'No');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'checkbox-' + id;
    checkBox.classList.add('resolve-checkbox');
    checkBox.checked = isResolved;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
    deleteButton.onclick = function () {
        deleteBug(id);
    };

    list.appendChild(item);
    item.appendChild(bugDescription);
    item.appendChild(checkBox);
    item.appendChild(deleteButton);

    checkBox.addEventListener('change', function () {
        changeBugStatus(id, checkBox.checked);
    });
}

async function addBug(name) {
    let form = document.getElementById('add-bug-container');
    let bugDescription = document.getElementById('new-bug').value;
    let bugId = document.getElementById('new-bug-id').value;
    let criticality = document.getElementById('new-bug-criticality').value;

    form.classList.remove('was-validated');

    try {
        await contract.methods.addBug(bugId, bugDescription, criticality).send({
            from: web3.eth.defaultAccount,
            gas: '1000000'
        });

        addBugToList(bugId, bugDescription, bugId, criticality, false); // Assuming initial status is false
    } catch (error) {
        console.log('Failed to save bug to blockchain.', error);
    }
}

async function changeBugStatus(id, isChecked) {
    try {
        await contract.methods.updateBugStatus(id, isChecked).send({
            from: web3.eth.defaultAccount,
            gas: '1000000'
        });
    } catch (error) {
        console.log('Failed to change status of bug. Bug ID: ' + id, error);
    }
}

async function deleteBug(id) {
    try {
        await contract.methods.deleteBug(id).send({
            from: web3.eth.defaultAccount,
            gas: '1000000'
        });

        // Assuming a successful delete, remove the bug from the UI
        let item = document.getElementById('item-' + id);
        if (item) {
            item.remove();
        }
    } catch (error) {
        console.log('Failed to delete bug. Bug ID: ' + id, error);
    }
}

function getCriticalityLabel(criticality) {
    switch (criticality) {
        case '0':
            return 'Low';
        case '1':
            return 'Medium';
        case '2':
            return 'Critical';
        default:
            return 'Unknown';
    }
}
