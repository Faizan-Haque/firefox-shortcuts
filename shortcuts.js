browser.commands.onCommand.addListener(function(command) {
    const windowTabs = browser.tabs.query({ currentWindow: true });
    windowTabs.then(handle.bind(null, command), error);
});

function handle(command, windowTabs) {
    const tabCommands = [
        "first_tab",
        "second_tab",
        "third_tab",
        "fourth_tab",
        "fifth_tab",
        "sixth_tab",
        "seventh_tab",
        "eighth_tab"
    ];

    const index = tabCommands.indexOf(command);
    if (index !== -1 && windowTabs.length > index) {
        browser.tabs.update(windowTabs[index].id, { active: true });
        return;
    }

    if (command === "previous_tab") {
        const activeTabIndex = windowTabs.findIndex(tab => tab.active);
        const nextIndex = (activeTabIndex - 1 + windowTabs.length) % windowTabs.length;
        browser.tabs.update(windowTabs[nextIndex].id, { active: true });
        return;
    }

	if (command === "next_tab") {
        const activeTabIndex = windowTabs.findIndex(tab => tab.active);
        const nextIndex = (activeTabIndex + 1) % windowTabs.length;
        browser.tabs.update(windowTabs[nextIndex].id, { active: true });
        return;
    }
}

function error(msg) {
    console.log("Error: " + msg);
}
