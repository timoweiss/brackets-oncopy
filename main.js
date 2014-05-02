/*
 * Copyright (c) 2014 Timo Weiß
 */

define(function(require, exports, module) {
    "use strict";

    var AppInit = brackets.getModule("utils/AppInit");
    var EditorManager = brackets.getModule("editor/EditorManager");
    var DocumentManager = brackets.getModule("document/DocumentManager");

    var Plugin = {
        initialize: function() {
            this.registerEvents();
            $('#status-info').append('<div id="copiedMessage" style="margin: 0 0 0 10px;"></div>');
        },
        registerEvents: function() {
            var that = this;
            $(this.getEditorDivElement()).on('copy cut', function(e) {
                that.showMessage();
            });
        },
        showMessage: function() {
            var selection = this.getActiveEditor().getSelectedText();
            var $copiedMessage = $('#copiedMessage');

            $copiedMessage.html('');
            $copiedMessage.html('<div class="copiedMessageText"> copied ' + selection.length + '  characters to clipboard </div>');
            setTimeout(function() {
                $('#copiedMessage .copiedMessageText').fadeOut();
            }, 2000);
        },
        getActiveEditor: function() {
            return EditorManager.getActiveEditor();
        },
        getEditorDivElement: function() {
            if (this.getActiveEditor()) {
                return this.getActiveEditor().getRootElement();
            }
            return window;
        }
    };

    AppInit.appReady(function() {

        // Initialize
        if (DocumentManager.getCurrentDocument()) {
            Plugin.initialize();
        }
        $(DocumentManager).on("currentDocumentChange", function() {
            Plugin.initialize();
        });

    });


});