let instance = null;
import RuntimeMode from './RuntimeMode';

export class Messages {
    constructor() {
        if (!instance) {
            instance = this;
            //hack - don't know how else to get around this. removing it causes unexpected token because of some es6 compilation issue.
            if (RuntimeMode.runningTest()) {
                this.I18n = {};
            } else {
                this.I18n = require('react-native-i18n');
            }

            this.I18n.fallbacks = true;
            this.I18n.translations = {
                en: {
                    questionnaireList: 'Decision Support Tools',
                    confirmation: 'Confirmation',
                    next: 'Next',
                    previous: 'Previous',
                    restart: 'Restart',
                    saveAndRestart: 'Save & Restart',
                    export: 'Export',
                    answersConfirmationTitle: 'You answered as follows',
                    allQuestionnaireSessionsSummary: "All Questionnaire Sessions",
                    session: "Session Details",
                    decisionsMadeBySystem: "Decisions made by system",
                    viewSavedSessions: "Saved Sessions",
                    sessionsForPrefix: "Sessions for",
                    zeroNumberOfSessions: "There are no saved sessions"
                },
                mr_IN: {
                    questionnaireList: 'Decision Support Tools(MR)'
                },
                hi_IN: {
                    questionnaireList: 'फेसला समर्थन उपकरण',
                    next: 'अगला',
                    previous: 'पिछला',
                    confirmation: 'पुष्टीकरण',
                    restart: 'पुनः आरंभ करें',
                    saveAndRestart: 'बचाएँ एवं पुनः आरम्भ करें',
                    export: 'निर्यात',
                    answersConfirmationTitle: ''
                }
            }
        }

        return instance;
    }

    addTerminologyMessages(conceptData) {
        conceptData.concepts.forEach((concept) => {
            concept.conceptNames.forEach((conceptName) => {
                var translationInALocale = this.I18n.translations[conceptName.locale];
                if (translationInALocale === undefined) {
                    this.I18n.translations[conceptName.locale] = {};
                }
                this.I18n.translations[conceptName.locale][concept.name] = conceptName.name;
            });
        });
    }

    getI18n() {
        return this.I18n;
    }
}

export default new Messages().getI18n();