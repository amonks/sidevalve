(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['destination.html.hbs'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<li>\n  <a class='destination' id ='"
    + alias1(((helper = (helper = helpers.destinationID || (depth0 != null ? depth0.destinationID : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"destinationID","hash":{},"data":data}) : helper)))
    + "' href='#'>\n    "
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.destination : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n</li>\n";
},"useData":true});
})();