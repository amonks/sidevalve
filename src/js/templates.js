this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["src/handlebars/about-text.md.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "## "
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n\n"
    + alias3(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"about","hash":{},"data":data}) : helper)))
    + "\n\n### Sidevalve\n\nThis game runs on [Sidevalve](https://github.com/sidevalve/sidevalve), a pretty cool game engine by Andrew Monks and Fenn Macon.\n\nYou can make your own game real easy.\n";
},"useData":true});

this["Handlebars"]["templates"]["src/handlebars/destination.html.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<li>\n  <a class='destination' id ='"
    + alias1(((helper = (helper = helpers.destinationID || (depth0 != null ? depth0.destinationID : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"destinationID","hash":{},"data":data}) : helper)))
    + "' href='#'>\n    "
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.destination : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n</li>\n";
},"useData":true});

this["Handlebars"]["templates"]["src/handlebars/inventory-object.html.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"col-xs-4\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n    </div>\n    <div class=\"panel-body\">\n      <img class='item img-responsive' src='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.image : stack1), depth0))
    + "' />\n      "
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n  </div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["src/handlebars/inventory-panel.html.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"inventory-panel\" class=\"col-xs-6\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Inventory</h3>\n    </div>\n    <div class=\"panel-body\" id=\"inventory\">\n    </div>\n  </div>\n</div>\n";
},"useData":true});