using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Profile { get; set; } = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
        public string PhoneNumber { get; set; } = "";
        public string Email { get; set; } = "";
        public string EmailUpperCase { get; set; } = "";
        public string PrivateKey { get; set; } = "";
        public Guid Invitation { get; set; }
        public UserStatus Status { get; set; } = UserStatus.Activity;
        public DateTimeOffset CreatedDateTime { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset LastModifiedDateTime { get; set; } = DateTimeOffset.Now;
    }

    public enum UserStatus
    {
        Activity = 0,
        Blocking,
        Deleted
    }

    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        void IEntityTypeConfiguration<User>.Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(32);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(32);
            builder.HasData(Seeds.Users);
            builder.HasQueryFilter(user => user.Status != UserStatus.Deleted);
        }
    }
}
