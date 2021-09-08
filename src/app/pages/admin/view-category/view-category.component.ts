import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories = [{ cId: "", title: '', description: '' },];

  constructor(private category: CategoryService) { }

  ngOnInit(): void {
    this.category.categories().subscribe((data: any) => {
      console.log(data)
      this.categories = data;
    },
      (error) => {
        console.log(error)
      });
  }
  deteleCat(cId: any) {
    //alert(cId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.category.deleteCategory(cId).subscribe(
          () => {
            this.categories = this.categories.filter((category) => category.cId != cId);
            Swal.fire(
              'Deleted!',
              'Category has been deleted.',
              'success'
            )
          },
          (error) => {
            Swal.fire("Error", "category is not deleted", "error")
          }
        );

      }
    })
  }
  myFunction() {
    this.categories.reverse();
  }
}
