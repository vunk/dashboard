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
    return render(request, 'home/abc.html', data)


def home(request):
    gapminder = px.data.gapminder().query("country=='Canada'")

    fig = px.line(gapminder, x="year", y="lifeExp", title='Life exp ectancy in Canada')
    plot_div = plot(fig, output_type='div', include_plotlyjs=False)

    data = {
        'joy': plot_div,
    }
    return render(request, 'home/home.html', data)
