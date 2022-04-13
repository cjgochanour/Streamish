using Microsoft.AspNetCore.Mvc;
using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Streamish.Tests
{
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_Users()
        {
            var userCount = 10;
            var users = CreateTestUsers(userCount);

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            var result = controller.Get();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUsers = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(userCount, actualUsers.Count());
            Assert.Equal(users, actualUsers);
        }

        [Fact]
        public void Get_By_Id_Returns_Proper_User()
        {
            var testUserId = 40;
            var users = CreateTestUsers(4);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            var result = controller.Get(testUserId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualUser = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testUserId, actualUser.Id);
        }

        [Fact]
        public void Post_Adds_User()
        {
            var userCount = 30;
            var users = CreateTestUsers(userCount);

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            var newUser = new UserProfile()
            {
                Name = "Name",
                Email = "email@email.com",
                DateCreated = DateTime.Now,
                ImageUrl = "https://url.com"
            };

            controller.Post(newUser);

            Assert.Equal(userCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Updates_User()
        {
            var testUserId = 200;
            var users = CreateTestUsers(10);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            var userToUpdate = new UserProfile()
            {
                Id = testUserId,
                Name = "Updated Name",
                Email = "updated@email.com",
                DateCreated = DateTime.Today,
                ImageUrl = "http://updated.url"
            };

            controller.Put(testUserId, userToUpdate);

            var userFromDb = repo.InternalData.FirstOrDefault(u => u.Id == testUserId);
            Assert.NotNull(userFromDb);

            Assert.Equal(userToUpdate.Name, userFromDb.Name);
            Assert.Equal(userToUpdate.Email, userFromDb.Email);
            Assert.Equal(userToUpdate.ImageUrl, userFromDb.ImageUrl);
            Assert.Equal(userToUpdate.DateCreated, userFromDb.DateCreated);
        }

        [Fact]
        public void Delete_Removes_User()
        {
            var testUserId = 250;
            var users = CreateTestUsers(10);
            users[0].Id = testUserId;

            var repo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(repo);

            controller.Delete(testUserId);

            var videoFromDb = repo.InternalData.FirstOrDefault(u => u.Id == testUserId);
            Assert.Null(videoFromDb);
        }

        private List<UserProfile> CreateTestUsers(int count)
        {
            var users = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                users.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"Number {i}",
                    Email = $"user{i}@email.com",
                    ImageUrl = $"http://test.com/{i}.png",
                    DateCreated = DateTime.Now
                });
            }
            return users;
        }
    }
}
