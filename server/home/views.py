from django.shortcuts import render
import plotly.express as px
from plotly.offline import plot
import plotly.graph_objs as go
 
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
    data = {
        'headers' : ['name', 'age', 'Dep'],
	'rows' : [['Joy', '27', 'IT'],
		  ['Alva', '20', 'IT'],
                  ['Jim', '21', 'FIN'],
                  ['Ray', '30', 'ADM'],
                  ['Wade', '32', 'IT'],
                  ['Alan','30', 'MANAGER']]
    }    
    return render(request, 'report_1.html', data)

# Create your views here.
