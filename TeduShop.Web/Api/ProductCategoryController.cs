﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeduShop.Model.Models;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;
using TeduShop.Web.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/productcategory")]
    public class ProductCategoryController : ApiControllerBase
    {
        #region Initialize
        private IProductCategoryService _productCategoryService;

        public ProductCategoryController(IErrorService errorService, IProductCategoryService productCategoryService)
            : base(errorService)
        {
            this._productCategoryService = productCategoryService;
        }
        #endregion

    [Route("getall")]
    [HttpGet]
    public HttpResponseMessage GetAll(HttpRequestMessage request, string keyword, int page, int pageSize = 20)
    {
        return CreateHttpResponse(request, () =>
        {
            int totalRow = 0;
            var model = _productCategoryService.GetAll(keyword);
            totalRow = model.Count();
            var query = model.OrderByDescending(x=>x.CreatedDate).Skip(page * pageSize).Take(pageSize);

            //var responseData = Mapper.Map<IEnumerable<ProductCategoryViewModel>>(model);
            var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(query);

            var paginationSet = new PaginationSet<ProductCategoryViewModel>()
            {
                Items = responseData,
                Page = page,
                TotalCount = totalRow,
                TotalPages = (int)Math.Ceiling((decimal)totalRow / pageSize)
            };


            var response = request.CreateResponse(HttpStatusCode.OK, paginationSet);

            return response;
        });
    }
    }
}
