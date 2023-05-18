using Backend.EFCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Backend.Model
{
    public class DbHelper
    {
        private EF_DataContext _context;
        public DbHelper(EF_DataContext context)
        {
            _context = context;
        }

        public List<ProductModel> GetProducts()
        {
            List<ProductModel> response = new List<ProductModel>();
            var dataList = _context.Products.ToList();
            dataList.ForEach(row => response.Add(new ProductModel()
            {
                Brand = row.Brand,
                ID = row.ID,
                Name = row.Name,
                Price = row.Price,
                Size = row.Size,
            }));
            return response;
        }

        public ProductModel GetProductByID(int ID)
        {
            ProductModel response = new ProductModel();
            var row = _context.Products.Where(d=>d.ID.Equals(ID)).FirstOrDefault();
            return new ProductModel()
            {
                Brand = row.Brand,
                ID = row.ID,
                Name = row.Name,
                Price = row.Price,
                Size = row.Size,
            };
        }
        /// <summary>
        /// It serves the POST/PUT/PATCH
        /// </summary>
        public void SaveOrder(OrderModel orderModel)
        {
            Order dbTable = new Order();
            if (orderModel.ID > 0)
            {
                //PUT
                dbTable = _context.Orders.Where(d => d.ID.Equals(orderModel.ID)).FirstOrDefault();
                if (dbTable != null)
                {
                    dbTable.phone = orderModel.phone;
                    dbTable.address = orderModel.address;
                }
            }
            else
            {
                //POST
                dbTable.phone = orderModel.phone;
                dbTable.address = orderModel.address;
                dbTable.name = orderModel.name;
                dbTable.Product = _context.Products.Where(f => f.ID.Equals(orderModel.product_id)).FirstOrDefault();
                _context.Orders.Add(dbTable);
            }
            _context.SaveChanges();
        }
        /// <summary>
        /// DELETE
        /// </summary>
        /// <param name="id"></param>
        public void DeleteOrder(int ID)
        {
            var order = _context.Orders.Where(d => d.Equals(ID)).FirstOrDefault();
            if (order != null)
            {
                _context.Orders.Remove(order);
                _context.SaveChanges();
            }
        }
    }
}
