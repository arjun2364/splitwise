import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.css']
})
export class AllExpenseComponent implements OnInit {

  expenses: any;
  k: number;
  amount: number;
  paidBy: string[] = [];
  paid: number[] = [];
  lentBy: string[] = [];
  lentTo: string[] = [];
  lent: number[] = [];
  constructor(private service: UserService, private fb: FormBuilder) { }

  commentForm: FormGroup = this.fb.group({
    commentData: ['']
  });

  ngOnInit() {
    this.service.getExpenseList().subscribe(
      (res: any) => {

        console.log(res);
        this.expenses = res.sort(this.sortFunction);

        for (var i = 0; i < this.expenses.length; i++) {
          this.k = 0;
          this.amount = 0;
          var name;
          var lentAmount = 0;
          var lentName;
          for (var j = 0; j < this.expenses[i].expenseLedgers.length; j++) {
            this.expenses[i].expenseLedgers[j]
            if (this.expenses[i].expenseLedgers[j].paid > 0) {
              this.k++;
              name = this.expenses[i].expenseLedgers[j].name;
              console.log(this.expenses[i].expenseLedgers[j].name);
              this.amount = this.amount + this.expenses[i].expenseLedgers[j].paid;
            }
            if (this.expenses[i].expenseLedgers[j].owes < 0) {
              lentAmount = lentAmount + this.expenses[i].expenseLedgers[j].owes;
              lentName = this.expenses[i].expenseLedgers[j].name;
            }
          }
          if (this.k <= 1) {
            this.paidBy.push(name);
            this.paid.push(this.amount);

          } else {
            this.paidBy.push(this.k + " people");
            this.paid.push(this.amount);
          }

          this.lent.push(lentAmount);
          this.lentBy.push(name);
          this.lentTo.push(lentName);

        }

        console.log(this.paid);
        console.log(this.paidBy);
      },
      (err) => { console.log(err); }
    );
    console.log(this.expenses);
  }

  sortFunction(a, b) {
    var dateA = new Date(a.createdOn).getTime();
    var dateB = new Date(b.createdOn).getTime();
    return dateA > dateB ? -1 : 1;
  };

  clickExpense(id: string) {
    if (document.getElementById(id).classList.contains('hide')) {
      document.getElementById(id).classList.remove('hide');
      document.getElementById(id).classList.add('show');
    }
    else {
      document.getElementById(id).classList.remove('show');
      document.getElementById(id).classList.add('hide');
    }
  }

  onSubmit(expenseId: string) {
    console.log(this.commentForm.value);
    console.log(expenseId);

    var comment = {
      Content: this.commentForm.value.commentData,
      ExpenseId: expenseId
    };
    this.service.addComment(comment).subscribe(
      (data: any) => { console.log(data); location.reload(); },
      (err: any) => { console.log(err); }
    );
  }

  deleteExpense(expenseId: string) {
    console.log("delete");
    var check = confirm("Are you sure you want to delete expense ?");
    if (check) {
      this.service.deleteExpense(expenseId).subscribe(
        (res: any) => { console.log(res); location.reload(); },
        (err) => { console.log(err); }
      );
    }
  }

  deleteComment(commentId: string) {
    console.log("delete" + commentId);
    var check = confirm("Are you sure you want to delete this comment?");
    if (check) {
      this.service.deleteComment(commentId).subscribe(
        (data: any) => {
          console.log(data);
          location.reload();
        },
        (err) => { console.log(err); }
      );
    }
  }
}
