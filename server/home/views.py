from django.shortcuts import render
import plotly.express as px
from plotly.offline import plot
import plotly.graph_objs as go
from home.models import Users
 
# from django.http import HttpResponse


def index(request):
    # return HttpResponse('<table><tr>222<td>123</td></tr></table>')
    gapminder = px.data.gapminder().query("country=='Canada'")

    fig = px.line(gapminder, x="year", y="lifeExp", title='Life exp ectancy in Canada')
    plot_div = plot(fig, output_type='div', include_plotlyjs=False)

    data = {
        'tt': '123',
        'joy': plot_div,
    }
    #return render(request, 'home/abc.html', data)
    return render(request, 'base.html', data)

def report_1(request):
    #data = {
    #    'headers' : ['name', 'age', 'Dep'],
    #	'rows' : [['Joy', '27', 'IT'],
    #		  ['Alva', '20', 'IT'],
    #              ['Jim', '21', 'FIN'],
    #              ['Ray', '30', 'ADM'],
    #              ['Wade', '32', 'IT'],
    #              ['Alan','30', 'MANAGER']]
    #}
    #return render(request, 'report_1.html, data)
    users = Users.objects.filter()
    users_headers = ['name', 'age', 'Dep']
    select_data = {
        'rpt_type' : ['1.一般銷售採購+硬體資料', '2.硬體資料(純製程)', '3.測試資料(軟體)'],
        'q_date' : ['1.訂單日期', '2.請購日期', '3.工單日期', '4.雜收日期'],
        'q_form' : ['1.訂單', '2.請購', '3.工單', '4.雜收'],
        'q_empty' : ['1.訂單', '2.採購', '3.收貨', '4.出貨', '5.工單', '6.完工入庫', '7.雜發']         
    }
   
    return render(request, 'report_1.html', {'users': users, 'users_headers': users_headers, 'select_data': select_data})

def login(request):
    return render(request, 'login.html')

# Create your views here.
