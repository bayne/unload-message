var $ = require('jquery');

module.exports = function (confirmationMessage) {
    $(function() {
        // We do not want this warning to trigger if the user is submitting a form
        var formSubmitting = false;

        $('[data-disable-onunload-message]').click(function() {
            formSubmitting = true;
        });

        /*
         * Logic for this from:
         * http://stackoverflow.com/questions/7317273/warn-user-before-leaving-web-page-with-unsaved-changes
         */
        window.beforeUnloadListener = function (e) {
            if (formSubmitting) {
                return undefined;
            }

            // Gecko + IE
            (e || window.event).returnValue = confirmationMessage;

            // Gecko + Webkit, Safari, Chrome etc.
            return confirmationMessage;
        };
        window.addEventListener("beforeunload", window.beforeUnloadListener);
    });
};
