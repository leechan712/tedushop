﻿using System.Web;
using System.Web.Optimization;
using TeduShop.Common;

namespace TeduShop.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/Assets/client/js/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/js/plugins").Include(
                "~/Assets/admin/libs/jqueryui/jquery-ui.min.js",
                "~/Assets/admin/libs/mustache/mustache.js",
                "~/Assets/admin/libs/numeral/numeral.min.js",
                "~/Assets/admin/libs/jquery-validation/dist/jquery.validate.js",
                "~/Assets/admin/libs/jquery-validation/dist/additional-methods.js",
                "~/Assets/client/js/common.js"
            ));

            bundles.Add(new StyleBundle("~/css/base")
                .Include("~/Assets/client/css/bootstrap.css", new CssRewriteUrlTransform())
                .Include("~/Assets/admin/libs/jqueryui/jquery-ui.min.css", new CssRewriteUrlTransform())
                .Include("~/Assets/client/css/style.css", new CssRewriteUrlTransform())
                .Include("~/Assets/client/css/custom.css", new CssRewriteUrlTransform())
                );

            BundleTable.EnableOptimizations = bool.Parse(ConfigHelper.GetByKey("EnableBundles"));
        }
    }
}
