﻿using Splitwise.DomainModel.Models;
using Splitwise.Repository.ActivityRepository;
using Splitwise.Repository.CommentRepository;
using Splitwise.Repository.ExpenseRepository;
using Splitwise.Repository.FriendRepository;
using Splitwise.Repository.GroupRepository;
using Splitwise.Repository.NotificationRepository;
using Splitwise.Repository.User;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Splitwise.Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SplitwiseDbContext _db;
        

        public IGroupRepository Group { get; private set; }
        public IUserRepository User { get; private set; }
        public ICommentRepository Comment { get; private set; }
        public IActivityRepository Activity { get; private set; }
        public IFriendRepository Friend { get; private set; }
        public IExpenseRepository Expense { get; private set; }
        public INotificationRepository Notification { get; private set; }

        public UnitOfWork(SplitwiseDbContext db, IGroupRepository group,
                                                IUserRepository user,
                                                ICommentRepository comment,
                                                IFriendRepository friend,
                                                IExpenseRepository expense,
                                                IActivityRepository activity,
                                                INotificationRepository notification)
        {
            _db = db;
            this.Group = group;
            this.User = user;
            this.Comment = comment;
            this.Friend = friend;
            this.Expense = expense;
            this.Activity = activity;
            this.Notification = notification;
        }

        public async Task<int> Commit()
        {
            return await _db.SaveChangesAsync();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
