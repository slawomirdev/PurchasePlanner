using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace Backend.EFCore
{
    [Table("Order")]
    public class Order
    {
        [Key, Required]
        public int ID { get; set; }
        public int product_ID { get; set; }

        public virtual product Product { get; set; }

        public string name { get; set; } = string.Empty;

        public string address { get; set; } = string.Empty;

        public string phone { get; set; } = string.Empty;
    }
}
