﻿using Splitwise.DomainModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Splitwise.Repository.CommentRepository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly SplitwiseDbContext _db;

        public CommentRepository(SplitwiseDbContext db)
        {
            _db = db;
        }
        public async Task AddComment(CommentData commentData,string currentUserId)
        {
            Comment comment = new Comment()
            {
                CommentData = commentData.Content,
                ExpenseId = commentData.ExpenseId,
                UserId = currentUserId,
                CreatedOn = DateTime.Now
            };
            await _db.Comments.AddAsync(comment);
        }

        public async Task DeleteComment(string commentId)
        {
            Comment comment = _db.Comments.Where(c => c.Id.Equals(commentId)).FirstOrDefault();
            _db.Comments.Remove(comment);
            await _db.SaveChangesAsync();
        }
    }
}
