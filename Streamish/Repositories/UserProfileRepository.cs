using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Streamish.Models;
using Streamish.Utils;

namespace Streamish.Repositories
{
    public class UserProfileRepository : BaseRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, up.Name, up.Email, up.DateCreated, up.ImageUrl
                                        FROM UserProfile up";
                    
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, up.Name, up.Email, up.DateCreated, up.ImageUrl
                                        FROM UserProfile up
                                        WHERE up.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile profile = null;
                        if (reader.Read())
                        {
                            profile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                            };
                        }
                        return profile;
                    }
                }
            }
        }

        public void Add(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile ([Name], Email, DateCreated, ImageUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @email, @dateCreated, @imageUrl)";

                    DbUtils.AddParameter(cmd, "@name", profile.Name);
                    DbUtils.AddParameter(cmd, "@email", profile.Email);
                    DbUtils.AddParameter(cmd, "@dateCreated", profile.DateCreated);
                    DbUtils.AddParameter(cmd, "@imageUrl", profile.ImageUrl);

                    profile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile profile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile
                                        SET [Name] = @name,
                                            Email = @email,
                                            DateCreated = @dateCreated,
                                            ImageUrl = @imageUrl
                                        WHERE Id= @id";

                    DbUtils.AddParameter(cmd, "@id", profile.Id);
                    DbUtils.AddParameter(cmd, "@email", profile.Email);
                    DbUtils.AddParameter(cmd, "@dateCreated", profile.DateCreated);
                    DbUtils.AddParameter(cmd, "@imageUrl", profile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@name", profile.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM UserProfile WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
