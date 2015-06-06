import angular from 'angular';

export default class Form {

    getEl(name) {
        if (angular.isString(name)) {
            var selector = `form[name="${name}"]`,
                el = document.querySelector(selector);

            return angular.element(el);
        }

        return name;
    }

    getCtrl(name) {
        return this.getEl(name).data('$formController');
    }
}
