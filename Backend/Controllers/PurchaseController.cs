using Backend.EFCore;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{

    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly DbHelper _db;

        public PurchaseController(EF_DataContext eF_DataContext)
        {
            _db = new DbHelper(eF_DataContext);
        }
        // GET: api/<PurchaseController>
        [HttpGet]
        [Route("api/[controller]/GetProducts")]
        public IActionResult Get()
        {
            ResponseType type = ResponseType.Success;
            try
            {
                IEnumerable<ProductModel> data = _db.GetProducts();
               
                if (!data.Any())
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // GET api/<PurchaseController>/
        [HttpGet]
        [Route("api/[controller]/GetProductByID")]
        public IActionResult Get(int ID)
        {
            ResponseType type = ResponseType.Success;
            try
            {
                ProductModel data = _db.GetProductByID(ID);

                if (data == null)
                {
                    type = ResponseType.NotFound;
                }
                return Ok(ResponseHandler.GetAppResponse(type, data));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // POST api/<PurchaseController>
        [HttpPost]
        [Route("api/[controller]/SaveOrder")]
        public IActionResult Post([FromBody] OrderModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveOrder(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex)
            {

                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // PUT api/<PurchaseController>/5
        [HttpPut]
        [Route("api/[controller]/UpdateOrder")]
        public IActionResult Put([FromBody] OrderModel model)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.SaveOrder(model);
                return Ok(ResponseHandler.GetAppResponse(type, model));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        // DELETE api/<PurchaseController>/5
        [HttpDelete]
        [Route("api/[controller]/DeleteOrder")]
        public IActionResult Delete(int id)
        {
            try
            {
                ResponseType type = ResponseType.Success;
                _db.DeleteOrder(id);
                return Ok(ResponseHandler.GetAppResponse(type, "Delete Successfully"));

            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }
    }
}
